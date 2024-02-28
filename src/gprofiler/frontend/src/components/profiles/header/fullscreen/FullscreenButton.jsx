

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
