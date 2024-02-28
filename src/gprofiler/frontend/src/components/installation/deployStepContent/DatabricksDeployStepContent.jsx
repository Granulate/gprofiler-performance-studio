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
