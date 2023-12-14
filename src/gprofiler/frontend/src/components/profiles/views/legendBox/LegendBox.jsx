{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Link, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import Flexbox from '../../../common/layout/Flexbox';
import Switch from '../../../common/selectors/switch/Switch';
import LegendButtons from './LegendButtons';

const LegendBox = ({
    areAllRuntimeFilterEnabled = true,
    isResetHidden = false,
    runtimeFilters = [],
    toggleRuntimeFilter = () => {},
    isRuntimeFilterActive = () => {},
    resetRuntimeFilters = () => {},
    isMixedRuntimeStacksModeEnabled = true,
    setIsMixedRuntimeStacksModeEnabled = () => {},
    disabled = false,
}) => {
    return (
        <Flexbox spacing={4}>
            <LegendButtons
                runtimeFilters={runtimeFilters}
                toggleRuntimeFilter={toggleRuntimeFilter}
                isRuntimeFilterActive={isRuntimeFilterActive}
                disabled={disabled}
            />
            {!areAllRuntimeFilterEnabled && !isResetHidden && (
                <Flexbox
                    sx={{
                        position: 'relative',
                        '&::before': {
                            content: "''",
                            borderLeft: '1px solid rgba(0, 0, 0, 0.85)',
                            height: '60%',
                            left: 0,
                            top: 0,
                            margin: 'auto',
                        },
                    }}>
                    <Flexbox alignItems='center' sx={{ ml: 4, mr: 6 }}>
                        <Link
                            sx={{ textDecoration: 'none' }}
                            disabled={disabled}
                            onClick={() => {
                                resetRuntimeFilters();
                            }}>
                            <Typography variant='body1_lato' sx={{ color: 'primary.main' }}>
                                Reset
                            </Typography>
                        </Link>
                    </Flexbox>

                    <Flexbox alignItems='center' sx={{ mr: 3 }}>
                        <Typography variant='body1_lato'>Mixed stacks</Typography>
                    </Flexbox>
                    <Flexbox alignItems='center'>
                        <Switch
                            checked={isMixedRuntimeStacksModeEnabled}
                            disabled={disabled || areAllRuntimeFilterEnabled}
                            onChange={() => {
                                setIsMixedRuntimeStacksModeEnabled(!isMixedRuntimeStacksModeEnabled);
                            }}
                        />
                    </Flexbox>
                </Flexbox>
            )}
        </Flexbox>
    );
};

LegendBox.propTypes = {
    areAllRuntimeFilterEnabled: PropTypes.bool,
    runtimesFilters: PropTypes.array,
    toggleRuntimeFilter: PropTypes.func,
    isRuntimeFilterActive: PropTypes.func,
    resetRuntimeFilters: PropTypes.func,
    isMixedRuntimeStacksModeEnabled: PropTypes.bool,
    setIsMixedRuntimeStacksModeEnabled: PropTypes.func,
};
export default LegendBox;
