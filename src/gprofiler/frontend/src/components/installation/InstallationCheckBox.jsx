{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Checkbox, FormControlLabel, Typography } from '@mui/material';

const InstallationCheckBox = ({ enableText, isChecked, setIsChecked }) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    sx={{ p: 0, mr: 2 }}
                    size='small'
                    checked={isChecked}
                    onChange={() => setIsChecked((prev) => !prev)}
                />
            }
            label={<Typography variant='body1_lato'>{enableText}</Typography>}
        />
    );
};

export default InstallationCheckBox;
