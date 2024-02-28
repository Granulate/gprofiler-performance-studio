{/*
 * Copyright (C) 2023 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/}

import { Box, Divider } from '@mui/material';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Tooltip from '@/components/common/dataDisplay/muiToolTip/Tooltip';
import { COPY_ONLY_IN_HTTPS } from '@/utils/consts';
import { isPathSecure } from '@/utils/generalUtils';

import { FgContext } from '../../../states';
import { COLORS } from '../../../theme/colors';
import { buildComparisonPermaLink } from '../../../utils/fgUtils';
import Button from '../../common/button/Button';
import Flexbox from '../../common/layout/Flexbox';
import ResetViewButton from '../../profiles/header/ResetViewButton';
import ComparisonSearch from './ComparisonSearch';

const PanelDivider = () => <Divider orientation='vertical' sx={{ borderColor: 'grey.dark', opacity: 0.1 }} flexItem />;

const ComparisonTopPanel = ({ absoluteTimeSelection, absoluteCompareTime }) => {
    const { isFgDisplayed } = useContext(FgContext);
    const { search } = useLocation();

    const disabled = !isFgDisplayed;

    const onCopyPermalinkClick = () => {
        if (isPathSecure()) {
            const permaLink = buildComparisonPermaLink(absoluteTimeSelection, absoluteCompareTime, search);
            navigator.clipboard.writeText(permaLink);
        }
    };

    return (
        <Flexbox column spacing={2}>
            <Box
                sx={{
                    background: `linear-gradient(180deg, ${COLORS.FIELD_BLUE_A} 50%, ${COLORS.WHITE}  50%)`,
                    px: 4,
                    zIndex: 1,
                }}>
                <Flexbox
                    spacing={4}
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{
                        height: '45px',
                        width: '100%',
                        backgroundColor: 'white.main',
                        boxShadow: '0px 8px 12px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31)',
                        borderRadius: '26px',
                        px: 5,
                    }}>
                    <Flexbox
                        sx={{ width: '100%', maxWidth: '80%' }}
                        alignItems='center'
                        spacing={3}
                        divider={<PanelDivider />}
                        justifyContent='start'>
                        <ComparisonSearch placeholder='Search' disabled={disabled} />
                    </Flexbox>
                    <Flexbox spacing={4} justifyContent='space-between' alignItems='center'>
                        <ResetViewButton disabled={disabled} />
                        <Tooltip
                            content={COPY_ONLY_IN_HTTPS}
                            size='small'
                            placement='bottom-start'
                            delay={[500, 0]}
                            maxWidth={'none'}
                            arrow={false}
                            followCursor={true}>
                            <Button
                                variant='text'
                                sx={{ whiteSpace: 'nowrap', minWidth: '140px' }}
                                onClick={onCopyPermalinkClick}>
                                Copy permalink
                            </Button>
                        </Tooltip>
                    </Flexbox>
                </Flexbox>
            </Box>
        </Flexbox>
    );
};

export default ComparisonTopPanel;
