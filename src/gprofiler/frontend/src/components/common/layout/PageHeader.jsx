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

import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { COLORS } from '@/theme/colors';

import { GprofilerText } from '../../../svg';
import Icon from '../icon/Icon';
import { ICONS_NAMES } from '../icon/iconsData';
import Flexbox from './Flexbox';

const PageHeader = ({ title, leftElement, rightElement }) => {
    return (
        <Flexbox
            alignItems='center'
            spacing={4}
            sx={{
                p: 4,
                pl: 6,
                backgroundColor: 'white.main',
                boxShadow: 3,
            }}>
            <Flexbox column alignItems='center' sx={{ width: '110px' }}>
                <GprofilerText />
            </Flexbox>

            <Icon name={ICONS_NAMES.Diamond} color={COLORS.ORANGE_PAECH} size={8} vertical />
            <Typography variant='h6'>{title}</Typography>
            {(leftElement || rightElement) && (
                <Flexbox alignItems='center' justifyContent='space-between' spacing={2} width='100%'>
                    {leftElement}
                    {rightElement}
                </Flexbox>
            )}
        </Flexbox>
    );
};

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    leftElement: PropTypes.element,
    rightElement: PropTypes.element,
};

export default PageHeader;
