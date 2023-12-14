{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import Tooltip from '@/components/common/dataDisplay/muiToolTip/Tooltip';
import Icon from '@/components/common/icon/Icon';
import { ICONS_NAMES } from '@/components/common/icon/iconsData';
import { ContainerIcon, ECSIcon, InstancesIcon, K8sIcon } from '@/components/common/icon/svgIcons';
import Flexbox from '@/components/common/layout/Flexbox';
import { COLORS } from '@/theme/colors';

export const ClusterTypeIcon = ({ type, small = false, color = undefined }) => {
    switch (type) {
        case 'instances':
            return <InstancesIcon fontSize={small ? 'small' : 'medium'} color={color} />;
        case 'containers':
            return <ContainerIcon fontSize={small ? 'small' : 'medium'} color={color} />;
        case 'k8s':
            return <K8sIcon fontSize={small ? 'small' : 'medium'} color={color} />;
        case 'ecs':
            return <ECSIcon fontSize={small ? 'small' : 'medium'} color={color} />;
        default:
            return (
                <Icon
                    name={ICONS_NAMES.Circle}
                    color={color || '#A0AEC0'}
                    size={small ? 12 : 15}
                    marginRight={4}
                    marginLeft={4}
                />
            );
    }
};

export const getEnvTypeName = (type) => {
    switch (type) {
        case 'instances':
            return 'Plain';
        case 'containers':
            return 'Cont';
        case 'k8s':
            return 'K8s';
        case 'ecs':
            return 'ECS';
        default:
            return '';
    }
};

const getEnvTypeTooltip = (type) => {
    switch (type) {
        case 'instances':
            return 'This service is running on plain machines - no orchestration detected';
        case 'containers':
            return 'This service is based on containers';
        case 'k8s':
            return 'This service is based on k8s';
        case 'ecs':
            return 'This service is based on ECS';
        default:
            return '';
    }
};

const ClusterTypeIconAndText = ({ type, color = COLORS.SILVER_GREY }) => {
    return (
        <Tooltip
            content={getEnvTypeTooltip(type)}
            size='small'
            placement='bottom-start'
            delay={[500, 0]}
            maxWidth={'none'}
            arrow={false}
            followCursor={true}>
            <Box>
                <Flexbox spacing={1} alignItems='center'>
                    <ClusterTypeIcon type={type} small color={color} />
                    <Typography noWrap sx={{ fontSize: '10px', lineHeight: '10px', fontFamily: 'Lato' }} color={color}>
                        {getEnvTypeName(type)}
                    </Typography>
                </Flexbox>
            </Box>
        </Tooltip>
    );
};

export default ClusterTypeIconAndText;
