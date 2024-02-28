

import { useContext, useEffect } from 'react';

import useGetFgData from '../../api/hooks/useGetFgData';
import useGetFgMetrics from '../../api/hooks/useGetFgMetrics';
import UsePageTitle from '../../hooks/usePageTitle';
import { FgContext } from '../../states';
import { getUpdatedFgData } from '../../utils/fgUtils';
import FGLoader from './FGLoader';
import ProfilesEmptyState from './ProfilesEmptyState';
import ProfilesViewsWrapper from './ProfilesViewsWrapper';

const ProfilesWrapper = () => {
    const {
        setFgOriginData,
        setFgOriginDataLoading,
        setZoomedFgData,
        setLastWeekOriginData,
        setIsFgDisplayed,
        setIsFgLoading,
        setFgMetrics,
        setCoresNodesCount,
        setCoresNodesCountLoading,
        setFgMetricsLoading,
        setInstanceTypeLoading,
        setInstanceType,
    } = useContext(FgContext);

    const { data, error, lastWeekDataError, lastWeekData, isLastWeekDataLoading, loading } = useGetFgData({});
    const {
        metricsData,
        metricsLoading,
        coresNodesCountData,
        coresNodesCountLoading,
        instanceTypeData,
        instanceTypeDataLoading,
    } = useGetFgMetrics({});
    UsePageTitle();
    const isFgDisplayed = !error && !lastWeekDataError && !loading && !isLastWeekDataLoading && data && !!data?.value;

    useEffect(() => {
        if (!loading && data) {
            const updatedData = getUpdatedFgData(data);
            setFgOriginData(updatedData);
            setZoomedFgData(updatedData);
            setFgOriginDataLoading(false);
        }
        if (loading) {
            setFgOriginDataLoading(true);
        }
    }, [data, loading, setFgOriginData, setZoomedFgData, setFgOriginDataLoading]);

    useEffect(() => {
        if (!isLastWeekDataLoading && lastWeekData && lastWeekData?.success !== false) {
            setLastWeekOriginData(getUpdatedFgData(lastWeekData));
        }
    }, [isLastWeekDataLoading, lastWeekData, setLastWeekOriginData]);

    useEffect(() => {
        setIsFgDisplayed(isFgDisplayed);
        setIsFgLoading(loading || isLastWeekDataLoading);
    }, [setIsFgDisplayed, isFgDisplayed, setIsFgLoading, loading, isLastWeekDataLoading]);

    useEffect(() => {
        if (coresNodesCountLoading) {
            setCoresNodesCount({});
            setCoresNodesCountLoading(true);
        } else {
            setCoresNodesCount(coresNodesCountData);
            setCoresNodesCountLoading(false);
        }
    }, [coresNodesCountData, coresNodesCountLoading, setCoresNodesCount, setCoresNodesCountLoading]);

    useEffect(() => {
        if (metricsLoading) {
            setFgMetricsLoading(true);
            setFgMetrics({});
        } else {
            setFgMetrics(metricsData);
            setFgMetricsLoading(false);
        }
    }, [metricsData, metricsLoading, setFgMetrics, setFgMetricsLoading]);

    useEffect(() => {
        if (instanceTypeDataLoading) {
            setInstanceType({});
            setInstanceTypeLoading(true);
        } else {
            setInstanceType(instanceTypeData);
            setInstanceTypeLoading(false);
        }
    }, [instanceTypeData, setInstanceTypeLoading, setInstanceType, instanceTypeDataLoading]);

    return (
        <>
            {loading || isLastWeekDataLoading ? (
                <FGLoader />
            ) : (
                <>{!isFgDisplayed ? <ProfilesEmptyState errorMessage={error} /> : <ProfilesViewsWrapper />}</>
            )}
        </>
    );
};

export default ProfilesWrapper;
