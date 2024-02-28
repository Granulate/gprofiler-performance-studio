package db

import (
	"fmt"
	"github.com/montanaflynn/stats"
	"log"
	"restflamedb/common"
	"sort"
	"strconv"
	"sync"
)

type Graph struct {
	Frames         map[uint64]Frame
	percentiles    map[string]string
	rootFrames     []uint64
	EnrichWithLang bool
	mu             sync.Mutex
}

type ResponseFrame struct {
	Name        string          `json:"name"`
	Suffix      string          `json:"suffix,omitempty"`
	Value       int             `json:"value"`
	Children    []ResponseFrame `json:"children"`
	Language    string          `json:"language,omitempty"`
	SpecialType string          `json:"specialType,omitempty"`
}

func NewGraph(params common.FlameGraphParams) Graph {
	var enrichLang bool
	for _, enrichment := range params.Enrichment {
		switch enrichment {
		case "lang":
			enrichLang = true
		}
	}
	return Graph{
		Frames:         make(map[uint64]Frame),
		EnrichWithLang: enrichLang,
	}
}

func (graph *Graph) processFrame(frameHash uint64) int {
	glitchesFound := 0
	frame := graph.Frames[frameHash]

	if frame.IsRoot {
		graph.rootFrames = append(graph.rootFrames, frameHash)
	} else {
		if parent, ok := graph.Frames[frame.ParentHash]; ok {
			weight := graph.Frames[frameHash].Samples
			graph.Frames[frame.ParentHash].Childrens[frameHash] = true
			if weight > graph.Frames[frame.ParentHash].Samples {
				log.Printf("Glitch found: %s:%d (%d) >= %s:%d (%d)", frame.Name, frame.Hash, weight, parent.Name, parent.Hash, graph.Frames[frame.ParentHash].Samples)
				glitchesFound += 1
				weight = graph.Frames[frame.ParentHash].Samples
			}
			frame.Samples = weight
			graph.Frames[frameHash] = frame
		} else {
			log.Printf("Parent frameHash %v not found for child (%s) %v", frame.ParentHash, frame.Name, frame.Hash)
		}
	}
	return glitchesFound
}

func (graph *Graph) prepareFrames(limitFrames int) (int, error) {
	graph.rootFrames = make([]uint64, 0)
	graph.percentiles = make(map[string]string)

	frames := make([]uint64, len(graph.Frames))

	idx := 0
	for hash, _ := range graph.Frames {
		frames[idx] = hash
		idx += 1
	}

	sort.Slice(frames, func(i, j int) bool {
		return graph.Frames[frames[i]].Samples > graph.Frames[frames[j]].Samples
	})

	log.Printf("Fetched %d %d frames", len(frames), len(graph.Frames))

	if limitFrames > len(frames) {
		limitFrames = len(frames)
	}

	glitchesFound := 0
	for _, frame := range frames[:limitFrames] {
		glitchesFound += graph.processFrame(frame)
	}

	if graph.EnrichWithLang {
		for hash := range graph.Frames {
			lang := ""
			specialType := ""
			frameName := graph.Frames[hash].Name
			lang, specialType = identFrameLangAndSpecialType(frameName)
			frame := graph.Frames[hash]
			frame.Lang = lang
			frame.SpecialType = specialType
			graph.Frames[hash] = frame
		}
	}

	samples := make([]float64, 0)
	for _, v := range graph.Frames {
		samples = append(samples, float64(v.Samples))
	}

	// calculate percentiles if we have samples
	maxPercent := 100
	if len(samples) > 0 {
		for percent := 1; percent < maxPercent+1; percent++ {
			pVal, _ := stats.Percentile(samples, float64(percent))
			graph.percentiles[strconv.Itoa(percent)] = strconv.Itoa(int(pVal))
		}
	}
	return glitchesFound, nil
}

func (graph *Graph) updateFrames(frames map[uint64]Frame, minValue int) {
	graph.mu.Lock()
	defer graph.mu.Unlock()
	for hash, frame := range frames {
		if frame.Samples <= minValue { // Cut off everything less or equal minValue
			continue
		}
		if _, ok := graph.Frames[hash]; !ok {
			graph.Frames[hash] = frame
		} else {
			frame.Samples += graph.Frames[hash].Samples
			graph.Frames[hash] = frame
		}
	}
}

func (graph *Graph) GetPercentiles() map[string]string {
	return graph.percentiles
}

func (graph *Graph) BuildFlameGraph() (int, []ResponseFrame) {
	var generateChilds func(hash uint64, parent uint64, recursionLevel uint64) ResponseFrame
	result := make([]ResponseFrame, 0)
	total := 0
	var recursionLevel uint64

	generateChilds = func(hash uint64, parent uint64, recursionLevel uint64) ResponseFrame {
		frame := graph.Frames[hash]
		childs := make([]uint64, 0)
		for childHash := range frame.Childrens {
			childs = append(childs, childHash)
		}

		if graph.EnrichWithLang {
			if frame.Lang == MayBeGo {
				parentFrame := graph.Frames[parent]
				if parentFrame.Lang == Go {
					frame.Lang = Go
				} else {
					frame.Lang = Other
				}
				graph.Frames[hash] = frame
			}
		}
		newChilds := make([]ResponseFrame, 0)
		if len(childs) > 0 {
			for _, child := range childs {
				newChilds = append(newChilds, generateChilds(child, hash, recursionLevel+1))
			}
		}
		sort.Slice(newChilds, func(i, j int) bool {
			return newChilds[i].Name < newChilds[j].Name
		})

		name, suffix := frame.getTruncatedNameAndSuffix()
		return ResponseFrame{Name: name, Suffix: suffix, Value: graph.Frames[hash].Samples,
			Children: newChilds, Language: frame.Lang, SpecialType: frame.SpecialType}
	}

	// Sort root frames
	sort.Slice(graph.rootFrames, func(i, j int) bool {
		firstFrame := graph.rootFrames[i]
		secondFrame := graph.rootFrames[j]
		return graph.Frames[firstFrame].Name < graph.Frames[secondFrame].Name
	})
	for _, frame := range graph.rootFrames {
		res := generateChilds(frame, 0, recursionLevel)
		result = append(result, res)
		total += graph.Frames[frame].Samples
	}

	return total, result
}

func (graph *Graph) BuildCollapsedFile(out chan string, runtimes map[string]float64) {
	var generateChilds func(seq []uint64, path string, rootHash uint64) int
	defer close(out)

	generateChilds = func(seq []uint64, path string, rootHash uint64) int {
		sumWeight := 0
		for _, hash := range seq {
			childs := make([]uint64, 0)
			for childHash := range graph.Frames[hash].Childrens {
				childs = append(childs, childHash)
			}
			frame := graph.Frames[hash]
			weight := 0

			if path == "" {
				rootHash = hash
			}

			if len(childs) > 0 {
				if path != "" {
					weight = frame.Samples - generateChilds(childs, fmt.Sprintf("%s;%s", path, frame.Name), rootHash)
				} else {
					weight = frame.Samples - generateChilds(childs, fmt.Sprintf("%s", frame.Name), rootHash)
				}
			} else {
				weight = frame.Samples
			}
			if weight > 0 {
				if path == "" {
					out <- fmt.Sprintf("%s %d\n", frame.Name, weight)
				} else {
					out <- fmt.Sprintf("%s;%s %d\n", path, frame.Name, weight)
				}
			}
			sumWeight += frame.Samples
		}
		return sumWeight
	}

	if len(graph.rootFrames) == 0 {
		return
	}
	generateChilds(graph.rootFrames, "", 0)
}

func sortChildrenBySamples(graph *Graph, frameId uint64) []uint64 {
	frames := make([]Frame, 0)
	for hash := range graph.Frames[frameId].Childrens {
		frames = append(frames, graph.Frames[hash])
	}

	sort.Slice(frames, func(i, j int) bool {
		return frames[i].Samples > frames[j].Samples
	})

	var childrenSamplesSorted []uint64
	for _, frame := range frames {
		childrenSamplesSorted = append(childrenSamplesSorted, frame.Hash)
	}
	return childrenSamplesSorted

}

func findRuntimes(graph *Graph, frameId uint64, recursionLevel uint64, frames map[uint64]Frame) {
	sortedChildren := sortChildrenBySamples(graph, frameId)
	for _, childId := range sortedChildren {
		frame := graph.Frames[childId]
		if frame.Lang != "" && frame.Lang != Other && frame.Lang != MayBeGo && frame.Lang != Kernel {
			frames[frame.Hash] = frame
			return
		}
		if len(frame.Childrens) == 0 || recursionLevel > 100 {
			continue
		}
		findRuntimes(graph, frame.Hash, recursionLevel+1, frames)
	}
	return
}

func determineRuntime(graph *Graph, frameHash uint64) string {
	runtime := Other
	framesMap := make(map[uint64]Frame, 0)
	frames := make([]Frame, 0)
	findRuntimes(graph, frameHash, 1, framesMap)
	for _, v := range framesMap {
		frames = append(frames, v)
	}
	if len(frames) > 0 {
		sort.Slice(frames, func(i, j int) bool {
			return frames[i].Samples > frames[j].Samples
		})
		runtime = frames[0].Lang
	}
	return runtime
}

func CalcRuntimesDistribution(graph *Graph) map[string]float64 {
	allSamples := 0
	runtimes := make(map[string]int)
	runtimesPercentage := make(map[string]float64)

	for _, rootFrameHash := range graph.rootFrames {
		rootFrame := graph.Frames[rootFrameHash]
		runtime := determineRuntime(graph, rootFrameHash)
		runtimes[runtime] += rootFrame.Samples
		allSamples += rootFrame.Samples
	}
	for runtime, samples := range runtimes {
		runtimesPercentage[runtime] = float64(samples) / float64(allSamples)
	}
	return runtimesPercentage
}
