

import { createContext, useContext, useEffect, useState } from 'react';

import useTruncationQueryParams from '@/hooks/useTruncationQueryParams';
import { SelectorsContext } from '@/states/selectors';

export const FgContext = createContext();

export const FgProvider = ({ children }) => {
    const { timeSelection } = useContext(SelectorsContext);

    // Use State to keep the values
    const [lastWeekOriginData, setLastWeekOriginData] = useState({});
    const [fgOriginData, setFgOriginData] = useState({});
    const [fgOriginDataLoading, setFgOriginDataLoading] = useState(true);
    const [fgMetrics, setFgMetrics] = useState({});
    const [fgMetricsLoading, setFgMetricsLoading] = useState(true);
    const [coresNodesCount, setCoresNodesCount] = useState({});
    const [coresNodesCountLoading, setCoresNodesCountLoading] = useState(true);
    const [zoomedFgData, setZoomedFgData] = useState({});
    const [isFgDisplayed, setIsFgDisplayed] = useState(false);
    const [isFgLoading, setIsFgLoading] = useState(false);
    const [viewTruncated, setViewTruncated] = useState(false);
    const [instanceType, setInstanceType] = useState({});
    const [instanceTypeLoading, setInstanceTypeLoading] = useState(true);
    const [mineSweeperMode, setMineSweeperMode] = useState(false);
    const [framesSelected, setFramesSelected] = useState([]);
    const [isFGEmpty, setIsFGEmpty] = useState(false);

    useTruncationQueryParams({ viewTruncated, setViewTruncated });

    useEffect(() => {
        setFramesSelected([]);
    }, [timeSelection]);

    return (
        <FgContext.Provider
            value={{
                fgOriginData,
                setFgOriginData,
                fgOriginDataLoading,
                setFgOriginDataLoading,
                lastWeekOriginData,
                setLastWeekOriginData,
                zoomedFgData,
                setZoomedFgData,
                isFgDisplayed,
                setIsFgDisplayed,
                isFgLoading,
                setIsFgLoading,
                fgMetrics,
                setFgMetrics,
                fgMetricsLoading,
                setFgMetricsLoading,
                coresNodesCountLoading,
                setCoresNodesCountLoading,
                setCoresNodesCount,
                coresNodesCount,
                viewTruncated,
                setViewTruncated,
                instanceType,
                instanceTypeLoading,
                setInstanceTypeLoading,
                setInstanceType,
                mineSweeperMode,
                setMineSweeperMode,
                framesSelected,
                setFramesSelected,
                isFGEmpty,
                setIsFGEmpty,
            }}>
            {children}
        </FgContext.Provider>
    );
};
