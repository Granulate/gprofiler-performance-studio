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
