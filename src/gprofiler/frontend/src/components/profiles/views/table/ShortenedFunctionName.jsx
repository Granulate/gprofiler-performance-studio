

import { Box } from '@mui/material';

import Flexbox from '@/components/common/layout/Flexbox';
import { getFunctioNameEdges } from '@/utils/tableViewUtils';

const ShortenedFunctionName = ({ coreFunctionName, functionName }) => {
    const { start, end } = getFunctioNameEdges(functionName, coreFunctionName);
    return (
        <Flexbox>
            <Box
                component={'p'}
                sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',

                    direction: 'rtl',
                    textAlign: 'left',
                }}>
                {start}&lrm;
            </Box>
            <Box component={'p'} style={{ fontWeight: 'bold' }}>
                {coreFunctionName}
            </Box>
            <Box
                component={'p'}
                sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                {end}
            </Box>
        </Flexbox>
    );
};

export default ShortenedFunctionName;
