

import { Typography } from '@mui/material';

import Button from '@/components/common/button/Button';
import Tooltip from '@/components/common/dataDisplay/muiToolTip/Tooltip';
import { ICONS_NAMES } from '@/components/common/icon/iconsData';
import Flexbox from '@/components/common/layout/Flexbox';
import { EXTERNAL_URLS, PROFILES_VIEWS } from '@/utils/consts';

const viewModes = {
    [PROFILES_VIEWS.flamegraph]: {
        label: 'Flame Graph',
        description: 'Visual representation of hierarchical data, created to visualize stack traces of profiled data',
        infoURL: EXTERNAL_URLS.flameGraphLearn.to,
        icon: ICONS_NAMES.FlameGraphView,
    },
    [PROFILES_VIEWS.table]: {
        label: 'Table view',
        description: 'Table view are a tabular representation of the profiling data aggregated by function calls',
        infoURL: EXTERNAL_URLS.tableViewLearn.to,
        icon: ICONS_NAMES.TableView,
    },
    [PROFILES_VIEWS.service]: {
        label: 'Service overview',
        description: 'An overview of your gProfiler service, showing the service metrics and more',
        infoURL: EXTERNAL_URLS.serviceViewLearn.to,
        icon: ICONS_NAMES.ServiceView,
    },
};

const TooltipContent = ({ viewMode }) => {
    const { label, description, infoURL } = viewModes[viewMode || PROFILES_VIEWS.flamegraph];
    return (
        <Flexbox column spacing={4} justifyContent='start'>
            <Typography variant='subtitle2_lato'>{label}</Typography>

            <Typography variant='body4_lato'>{description}</Typography>

            <Button href={infoURL} fullWidth>
                Learn more
            </Button>
        </Flexbox>
    );
};

const ViewModeTooltip = ({ viewMode, children }) => {
    return (
        <Tooltip variant='dark' title={viewMode ? <TooltipContent viewMode={viewMode} /> : ''} placement='left' arrow>
            {children}
        </Tooltip>
    );
};

export default ViewModeTooltip;
