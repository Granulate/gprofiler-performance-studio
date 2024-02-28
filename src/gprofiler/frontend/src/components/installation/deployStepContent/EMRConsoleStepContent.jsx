

import { Box, Typography } from '@mui/material';
import { isEmpty } from 'lodash';

import CopyableParagraph from '../../common/dataDisplay/CopyableParagraph';

const EMRConsoleStepContent = ({ apiKey, serviceName }) => {
    const deployCommand = ` aws emr create-cluster ... --bootstrap-actions Path="s3://download.granulate.io/gprofiler_action.sh",Args="[--token=${apiKey},--service-name=${serviceName}]"`;
    return (
        <>
            <Box sx={{ mb: 3 }}>
                <Typography variant='h1_lato'>Use the following command in your AWS CLI</Typography>
            </Box>
            <CopyableParagraph disabled={isEmpty(serviceName)} isCode text={deployCommand} />
        </>
    );
};

export default EMRConsoleStepContent;
