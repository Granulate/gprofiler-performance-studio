

import styled from '@emotion/styled';
import Box from '@mui/material/Box';

export const LayoutContainer = styled(Box)`
    display: flex;
`;

export const ContentContainer = styled(Box)`
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    min-height: 100vh;
    align-items: stretch;
    display: flex;
    flex-direction: column;
`;

export const Main = styled(Box)`
    width: 100%;
    flex-grow: 1;
    align-items: stretch;
    display: flex;
    flex-direction: column;
`;
