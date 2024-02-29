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

//These are the options we want to let the user choose, but there are more options that are available in the rest flameDB if required

const ResolutionTimes = ['1 min', '5 min', '15 min', '1 hour', '6 hour'];
const ResolutionTimesConvert = {
    '1 min': '1 minutes',
    '5 min': '5 minutes',
    '15 min': '15 minutes',
    '1 hour': '1 hours',
    '6 hour': '6 hours',
};

export { ResolutionTimes, ResolutionTimesConvert };
