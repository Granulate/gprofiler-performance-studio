{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
