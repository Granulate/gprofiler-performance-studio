{
    /*
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
     */
}

import Select from '@/components/common/selectors/select/Select';
import { ResolutionTimes, ResolutionTimesConvert } from '@/components/profiles/utils';

const ResolutionDropDown = ({ setResolution, resolution, setResolutionValue }) => {
    return (
        <Select
            sx={{ mr: 8 }}
            fullWidth={true}
            placeholder='Resolution'
            selectedOption={resolution}
            disabled={false}
            onSelect={(option) => {
                setResolutionValue(ResolutionTimesConvert[option]);
                setResolution(option);
            }}
            options={ResolutionTimes}
        />
    );
};

export default ResolutionDropDown;
