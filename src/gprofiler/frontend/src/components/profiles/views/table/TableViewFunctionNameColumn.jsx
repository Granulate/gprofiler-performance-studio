

import { Link } from '@mui/material';
import { useRef } from 'react';

import Tooltip from '@/components/common/dataDisplay/muiToolTip/Tooltip';
import Flexbox from '@/components/common/layout/Flexbox';

import ShortenedFunctionName from './ShortenedFunctionName';

const FunctionNameColumn = ({ functionName, coreFunctionName, selected = false }) => {
    const el = useRef(undefined);
    const isShortened = functionName !== coreFunctionName;

    return (
        <Flexbox sx={{ cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis' }} spacing={3}>
            <Tooltip content={functionName} placement='bottom-start' delay={[500, 0]} arrow={false} followCursor={true}>
                <Link
                    ref={el}
                    sx={{
                        textDecoration: selected ? 'underline' : 'none',
                        ':hover': { textDecoration: 'underline' },
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                        variant: 'body1_lato',
                        color: 'grey.dark',
                    }}>
                    {isShortened ? (
                        <ShortenedFunctionName functionName={functionName} coreFunctionName={coreFunctionName} />
                    ) : (
                        functionName
                    )}
                </Link>
            </Tooltip>
        </Flexbox>
    );
};

export default FunctionNameColumn;
