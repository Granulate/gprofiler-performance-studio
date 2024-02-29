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

import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

const Flexbox = ({ column = false, direction = undefined, children, sxOverrides = {}, ...props }) => {
    return (
        <Stack direction={direction ? direction : column ? 'column' : 'row'} {...props}>
            {children}
        </Stack>
    );
};

Flexbox.propTypes = {
    column: PropTypes.bool,
    className: PropTypes.string,
    alignItems: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    justifyContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.node,
};

/** @component */
export default Flexbox;
