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



import { COLORS } from '@/theme/colors';

import Icon from './Icon';
import { ICONS_NAMES } from './iconsData';

const RefreshIcon = ({ color = COLORS.PRIMARY_PURPLE }) => (
    <Icon name={ICONS_NAMES.Refresh} color={color} marginRight={5} />
);
const CopyIcon = () => <Icon name={ICONS_NAMES.Copy} color={COLORS.PRIMARY_PURPLE} />;
const CheckCircleIcon = () => <Icon name={ICONS_NAMES.CheckCircle} color={COLORS.SUCCESS_GREEN} />;
const ArrowRightIcon = ({ color = COLORS.PRIMARY_PURPLE }) => <Icon name={ICONS_NAMES.ChevronRight} color={color} />;
const FullArrowDownIcon = (props) => <Icon name={ICONS_NAMES.ArrowDown} {...props} />;
const AlertIcon = () => <Icon name={ICONS_NAMES.Alert} vertical color={'#FF4F4F'} />;

const PrevIcon = () => <Icon name={ICONS_NAMES.ChevronLeft} color={COLORS.PRIMARY_PURPLE} vertical />;
const NextIcon = () => <Icon name={ICONS_NAMES.ChevronLeft} flip color={COLORS.PRIMARY_PURPLE} vertical />;

export { AlertIcon, ArrowRightIcon, CheckCircleIcon, CopyIcon, FullArrowDownIcon, NextIcon, PrevIcon, RefreshIcon };
