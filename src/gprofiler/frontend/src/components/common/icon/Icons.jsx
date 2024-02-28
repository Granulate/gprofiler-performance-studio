

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
