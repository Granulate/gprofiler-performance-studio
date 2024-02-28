package main

import (
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"path/filepath"
	"strings"
	"sync"
	"time"
)

func Worker(workerIdx int, args *CLIArgs, tasks <-chan SQSMessage, pw *ProfilesWriter, wg *sync.WaitGroup) {
	var buf []byte
	var err error
	var temp string

	defer wg.Done()

	sessionOptions := session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}
	if args.AWSEndpoint != "" {
		sessionOptions.Config = aws.Config{
			Region:   aws.String(args.AWSRegion),
			Endpoint: aws.String(args.AWSEndpoint),
		}
	}
	sess := session.Must(session.NewSessionWithOptions(sessionOptions))

	for task := range tasks {
		useSQS := task.Service != ""
		log.Debugf("got new file %s from %d", task.Filename, task.ServiceId)
		if useSQS {
			fullPath := fmt.Sprintf("products/%s/stacks/%s", task.Service, task.Filename)
			buf, err = GetFileFromS3(sess, args.S3Bucket, fullPath)
			if err != nil {
				log.Errorf("Error while fetching file from S3: %v", err)
				errDelete := deleteMessage(sess, task.QueueURL, task.MessageHandle)
				if errDelete != nil {
					log.Errorf("Unable to delete message from %s, err %v", task.QueueURL, errDelete)
				}
				continue
			}
			temp = strings.Split(task.Filename, "_")[0]
		} else {
			buf, _ = ioutil.ReadFile(task.Filename)
			tokens := strings.Split(filepath.Base(task.Filename), "_")
			if len(tokens) > 2 {
				temp = strings.Join(tokens[:3], ":")
			}
		}
		layout := ISODateTimeFormat
		timestamp, tsErr := time.Parse(layout, temp)
		log.Debugf("parsed timestamp is: %v", timestamp)
		if tsErr != nil {
			log.Debugf("Unable to fetch timestamp from filename %s, fallback to the current time", temp)
			timestamp = time.Now().UTC()
		}
		err = pw.ParseStackFrameFile(task.ServiceId, timestamp, buf)
		if err != nil {
			log.Errorf("Error while parsing stack frame file: %v", err)
		}
		if useSQS {
			errDelete := deleteMessage(sess, task.QueueURL, task.MessageHandle)
			if errDelete != nil {
				log.Errorf("Unable to delete message from %s, err %v", task.QueueURL, errDelete)
			}
		}
	}
	log.Debugf("Worker %d finished", workerIdx)
}
