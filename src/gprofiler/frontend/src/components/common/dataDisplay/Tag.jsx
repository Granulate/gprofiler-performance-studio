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



import { COLORS } from '../../../theme/colors';
import Icon from '../../common/icon/Icon';
import { ICONS_NAMES } from '../../common/icon/iconsData';
import Flexbox from '../layout/Flexbox';

const Tag = ({ onClose, children }) => {
    return (
        <Flexbox
            alignItems='center'
            justifyContent='flex-start'
            sx={{
                backgroundColor: 'white.main',
                borderRadius: '25px',
                color: 'success.contrastText',
                fontSize: '14px',
                height: '26px',
                lineHeight: '16px',
                fontWeight: 400,
                listStyle: 'none',
                fontFamily: 'Lato',
                maxWidth: 200,
                position: 'relative',
                mx: 1,
                pt: 0,
                px: 5,
                pr: 8,
                '& span': {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
            }}>
            <span>{children}</span>
            <button
                type='button'
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '100%',
                    borderRadius: '25px',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'absolute',
                    alignItems: 'center',
                    fontSize: 3,
                    color: COLORS.NAVY_DARK_BLUE,
                    justifyContent: 'center',
                    right: 0,
                    paddingRight: '5px',
                    backgroundColor: 'inherit',
                }}
                onClick={onClose}>
                <Icon name={ICONS_NAMES.Close} size={13} color={COLORS.NAVY_DARKER_BLUE} vertical />
            </button>
        </Flexbox>
    );
};

export default Tag;
