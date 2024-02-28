

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
