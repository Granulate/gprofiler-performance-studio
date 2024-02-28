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

import { Box } from '@mui/material';

import Button from '@/components/common/button/Button';
import Icon from '@/components/common/icon/Icon';
import { ICONS_NAMES } from '@/components/common/icon/iconsData';
import { COLORS } from '@/theme/colors';

const ClosePanelButton = ({ handlePanelShowState }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                left: '0',
                right: '0',
                top: 0,
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '23px',
                zIndex: 0,
            }}>
            <Button iconOnly onClick={handlePanelShowState} sx={{ px: 2, py: 1 }}>
                <Icon name={ICONS_NAMES['ChevronDown']} flip size={15} color={COLORS.GREY_1} />
            </Button>
        </Box>
    );
};

export default ClosePanelButton;
