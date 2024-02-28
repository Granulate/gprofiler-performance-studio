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

import { useContext } from 'react';

import { FiltersContext, SearchContext } from '../../../states';
import Button from '../../common/button/Button';

const ResetViewButton = ({ disabled = false }) => {
    const { setSearchValue } = useContext(SearchContext);
    const { resetProcessFilters, resetRuntimeFilters } = useContext(FiltersContext);

    return (
        <Button
            variant='text'
            disabled={disabled}
            sx={{ minWidth: '98px' }}
            onClick={() => {
                setSearchValue('');
                resetProcessFilters();
                resetRuntimeFilters();
                // this is a hack for fg to have enough time to parse and then reset properly
                setTimeout(() => {
                    resetProcessFilters();
                }, 100);
            }}>
            Reset view
        </Button>
    );
};

export default ResetViewButton;
