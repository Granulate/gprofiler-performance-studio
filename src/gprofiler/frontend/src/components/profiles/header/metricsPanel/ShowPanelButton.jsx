{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box, Slide } from '@mui/material';

import Button from '@/components/common/button/Button';
import Flexbox from '@/components/common/layout/Flexbox';
import { COLORS } from '@/theme/colors';

const ShowPanelButton = ({ handlePanelShowState, showPanel }) => {
    return (
        <Slide direction='down' in={!showPanel}>
            <Box
                sx={{
                    position: 'absolute',
                    left: '0',
                    right: '0',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '164px',
                    zIndex: 0,
                }}>
                <Flexbox
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{
                        borderRadius: '0 0 8px 8px',
                        background: COLORS.ALMOST_WHITE,
                        width: 'fit-content',
                        px: 5,
                    }}>
                    <Button size='small' variant='text' onClick={handlePanelShowState} sx={{ fontSize: '12px' }}>
                        Show metrics panel
                    </Button>
                </Flexbox>
            </Box>
        </Slide>
    );
};

export default ShowPanelButton;