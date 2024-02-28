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
