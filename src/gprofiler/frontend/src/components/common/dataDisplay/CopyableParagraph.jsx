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

import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { useState } from 'react';

import { COLORS } from '@/theme/colors';
import { COPY_ONLY_IN_HTTPS } from '@/utils/consts';
import { isPathSecure } from '@/utils/generalUtils';

import Tooltip from '../../common/dataDisplay/muiToolTip/Tooltip';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import { CheckCircleIcon, CopyIcon } from '../icon/Icons';
import { ICONS_NAMES } from '../icon/iconsData';
import Flexbox from '../layout/Flexbox';

const CopyButtonWithText = ({ disabled, isCopied, onCopyClicked }) => (
    <Tooltip placement='top' content={!isPathSecure() ? COPY_ONLY_IN_HTTPS : isCopied ? 'Copied!' : 'Copy'}>
        <Button
            startIcon={<Icon name={ICONS_NAMES.Copy} color={COLORS.WHITE} size={15} />}
            onClick={onCopyClicked}
            sx={{
                alignSelf: 'flex-end',
                p: '2px 35px',
                backgroundColor: 'primary.main',
                '&:hover': {
                    color: 'secondary.main',
                },
            }}
            disabled={disabled}>
            {isCopied ? 'Copied!' : 'Copy'}
        </Button>
    </Tooltip>
);

const CopyButtonWithIcon = ({ disabled, isCopied, onCopyClicked }) => (
    <Tooltip placement='top' content={!isPathSecure() ? COPY_ONLY_IN_HTTPS : isCopied ? 'Copied!' : 'Copy'}>
        <Button noHover iconOnly sx={{ alignSelf: 'flex-end' }} onClick={onCopyClicked} disabled={disabled}>
            {isCopied ? <CheckCircleIcon /> : <CopyIcon />}
        </Button>
    </Tooltip>
);

const CodeTypography = styled.code`
    font-size: 14px;
    font-weight: 400;
    background: transparent;
    overflow-wrap: anywhere;
    border: none;
    padding: 0;
    margin: 0;
    color: ${COLORS.PLAIN_GREY};
    white-space: pre-wrap;
`;

const CopyableParagraph = ({ text, isCode = false, disabled = false, highlightedButton = false }) => {
    const [isCopied, setIsCopied] = useState(false);

    const onCopyClicked = () => {
        if (isPathSecure()) {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 1500);
            navigator.clipboard.writeText(text);
        }
    };
    return (
        <Flexbox
            justifyContent='space-between'
            alignItems='center'
            sx={{
                borderRadius: '4px',
                backgroundColor: 'fieldBlue.main',
                p: 3,
            }}>
            {isCode ? <CodeTypography>{text}</CodeTypography> : <Typography>{text}</Typography>}
            {highlightedButton ? (
                <CopyButtonWithText onCopyClicked={onCopyClicked} disabled={disabled} isCopied={isCopied} />
            ) : (
                <CopyButtonWithIcon onCopyClicked={onCopyClicked} disabled={disabled} isCopied={isCopied} />
            )}
        </Flexbox>
    );
};

export default CopyableParagraph;
