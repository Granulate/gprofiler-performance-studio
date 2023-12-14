{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import Button from '@/components/common/button/Button';
import { ExpandIcon, MinimizeIcon } from '@/svg/topPanelIcons';
import { COLORS } from '@/theme/colors';
import { useFullScreenContext } from '@/utils/contexts';

const FullScreenButton = ({ disabled = false }) => {
    const { isFullScreen, setFullScreen } = useFullScreenContext();
    return (
        <Button
            iconOnly
            color='inherit'
            disabled={disabled}
            onClick={() => {
                setFullScreen(!isFullScreen);
            }}>
            {isFullScreen ? <MinimizeIcon /> : <ExpandIcon color={disabled ? COLORS.GREY_2 : undefined} />}
        </Button>
    );
};

export default FullScreenButton;
