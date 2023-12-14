{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
