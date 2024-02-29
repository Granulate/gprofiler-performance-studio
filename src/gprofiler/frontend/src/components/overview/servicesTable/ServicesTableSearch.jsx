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

import { InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

import { COLORS } from '../../../theme/colors';
import Button from '../../common/button/Button';
import Icon from '../../common/icon/Icon';
import { ICONS_NAMES } from '../../common/icon/iconsData';

const ServicesTableSearch = (props) => {
    return (
        <Box
            ref={props.boxRef}
            sx={{
                position: 'absolute',
                top: 0,
                borderRadius: 4,
                zIndex: props.visible ? 90 : 0,
                backgroundColor: 'grey.main',
                visibility: props.visible ? 'visible' : 'hidden',
                height: '39px',
                width: '30%',
            }}>
            <TextField
                size='small'
                inputRef={props.inputRef}
                value={props.value}
                onChange={props.onChange}
                placeholder='Search…'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <Icon name={ICONS_NAMES.Magnifier} color={COLORS.WHITE} size={25} />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <Button
                            iconOnly
                            color='inherit'
                            title='Clear'
                            aria-label='Clear'
                            hidden={!props.value}
                            onClick={props.clearSearch}>
                            <Icon name={ICONS_NAMES.Close} color={COLORS.WHITE} />
                        </Button>
                    ),
                }}
                fullWidth
                sx={{ paddingRight: 0, input: { color: 'white.main' } }}
            />
        </Box>
    );
};

ServicesTableSearch.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
};

export default ServicesTableSearch;
