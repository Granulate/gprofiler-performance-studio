{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { isEmpty } from 'lodash';

import CopyableParagraph from '../../common/dataDisplay/CopyableParagraph';

const DatabricksDeployStepContent = ({ apiKey, serviceName, shouldUseJobName }) => {
    const serviceNameFlag = shouldUseJobName
        ? '--databricks-job-name-as-service-name'
        : `--service-name="${serviceName}"`;
    const deployCommand = `wget -O gprofiler https://github.com/Granulate/gprofiler/releases/latest/download/gprofiler_\`uname -m\`\nsudo chmod +x gprofiler\nsudo TMPDIR=/proc/self/cwd ./gprofiler -cu --token="${apiKey}" ${serviceNameFlag} --perf-mode none --disable-pidns-check > /dev/null 2>&1 &`;

    const isParagraphDisabled = isEmpty(serviceName) && !shouldUseJobName;
    return (
        <div>
            <CopyableParagraph disabled={isParagraphDisabled} isCode highlightedButton text={deployCommand} />
        </div>
    );
};

export default DatabricksDeployStepContent;
