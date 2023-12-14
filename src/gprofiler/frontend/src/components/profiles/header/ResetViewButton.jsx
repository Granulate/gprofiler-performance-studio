{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { useContext } from 'react';

import { FiltersContext, SearchContext } from '../../../states';
import Button from '../../common/button/Button';

const ResetViewButton = ({ disabled = false }) => {
    const { setSearchValue } = useContext(SearchContext);
    const { resetProcessFilters, resetRuntimeFilters } = useContext(FiltersContext);

    return (
        <Button
            variant='text'
            disabled={disabled}
            sx={{ minWidth: '98px' }}
            onClick={() => {
                setSearchValue('');
                resetProcessFilters();
                resetRuntimeFilters();
                // this is a hack for fg to have enough time to parse and then reset properly
                setTimeout(() => {
                    resetProcessFilters();
                }, 100);
            }}>
            Reset view
        </Button>
    );
};

export default ResetViewButton;
