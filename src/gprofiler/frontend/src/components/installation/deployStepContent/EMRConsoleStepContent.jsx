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
