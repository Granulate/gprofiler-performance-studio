{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
