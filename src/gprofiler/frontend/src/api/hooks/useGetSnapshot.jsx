{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import _ from 'lodash';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { buildPermaLink } from '@/utils/fgUtils';
import { isPathSecure } from '@/utils/generalUtils';

import { FgContext, SelectorsContext } from '../../states';
import { FilterTagsContext } from '../../states/filters/FiltersTagsContext';
import { DATA_URLS } from '../urls';
import useFetchWithRequest from '../useFetchWithRequest';
import { getStartEndDateTimeFromSelection } from '../utils';

const areParamsDefined = (selectedService, timeSelection) => {
    return !_.isUndefined(selectedService) && !_.isUndefined(timeSelection);
};

export const usePostSnapshot = ({ frames = [], setSnapshotQueryParam, setShowCopyTooltip }) => {
    const { selectedService, timeSelection } = useContext(SelectorsContext);
    const { activeFilterTag } = useContext(FilterTagsContext);
    const { search } = useLocation();

    const [isSnapshotLocal, setIsSnapshotLocal] = useState(false);

    const fgParams = {
        serviceName: selectedService,
        filter: activeFilterTag,
    };
    const timeParams = getStartEndDateTimeFromSelection(timeSelection);

    const parsedPayload = JSON.stringify({
        frames,
        ...timeParams,
        ...fgParams,
    });

    const {
        data,
        loading,
        error,
        run: saveSnapshot,
    } = useFetchWithRequest(
        {
            url: `${DATA_URLS.SNAPSHOT}`,
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: parsedPayload,
        },
        {
            refreshDeps: [selectedService, timeSelection, activeFilterTag],
            ready: areParamsDefined(selectedService, timeSelection),
            manual: true,
            onSuccess: (result) => {
                setSnapshotQueryParam(result);
                setIsSnapshotLocal(true);
                if (isPathSecure()) {
                    const permaLink = buildPermaLink(timeSelection, search, result);
                    navigator.clipboard.writeText(permaLink);
                }
                setShowCopyTooltip(true);
            },
        }
    );

    return {
        saveSnapshot,
        loadingSaveSnapshot: loading,
        saveError: error?.message,
        saveSnapshotResponse: data,
        isSnapshotLocal,
    };
};

export const useGetSnapshot = ({ snapshotId = '', isSnapshotLocal }) => {
    const { setFramesSelected } = useContext(FgContext);

    const { data, loading, error } = useFetchWithRequest(
        {
            url: `${DATA_URLS.SNAPSHOT}/${snapshotId}`,
        },
        {
            refreshDeps: [snapshotId],
            ready: !!snapshotId && !isSnapshotLocal,
            onSuccess: (result) => {
                setFramesSelected(result.frames || []);
            },
        }
    );

    return { snapshotData: data, snapshotLoading: loading, snapshotError: error?.message };
};
