{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box, Grow, Modal as MaterialModal } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Icon from '../../icon/Icon';
import { ICONS_NAMES } from '../../icon/iconsData';

const mapVariantToModalStyle = {
    welcomeToTour: {
        height: 'fit-content',
        width: '100%',
        maxWidth: '555px',
        margin: 'auto',
        borderRadius: 2,
    },
    default: {
        backgroundColor: 'grey.main',
        borderRadius: 1,
        boxShadow: `medium`,
        display: `flex`,
        flexDirection: `column`,
        maxHeight: `80vh`,
        minHeight: '16rem',
        minWidth: '16rem',
        maxWidth: 'min(90vw, 64rem)',
        position: `absolute`,
        top: [`25%`, `10%`, `10%`],
    },
    installationGIF: {
        margin: 'auto',
        height: 'fit-content',
        maxWidth: 800,
        borderRadius: 2,
        alignItems: 'center',
    },
    simpleTable: {
        width: '100%',
        height: 'fit-content',
        maxWidth: '1300px',
        margin: 'auto',
        borderRadius: 2,
    },
};
const Modal = ({
    open = false,
    onClose = () => {},
    onBackClick = () => {},
    children,
    withCloseIcon = false,
    closeIconColor = '',
    withBackIcon = false,
    backIconColor = '',
    mask = 'dark',
    variant = 'default',
    overrideSx = {},
}) => {
    const theme = useTheme();
    const onCloseHandler = () => {
        onClose();
    };
    return (
        <MaterialModal
            open={!!open}
            onClose={() => onCloseHandler()}
            sx={
                variant
                    ? { ...overrideSx, ...mapVariantToModalStyle[variant], zIndex: 'modal' }
                    : { ...overrideSx, ...mapVariantToModalStyle['default'], zIndex: 'modal' }
            }
            BackdropProps={{
                sx: {
                    backgroundColor:
                        mask === 'light' ? 'masked.light' : mask === 'blurred' ? 'masked.blurred' : 'masked.dark',
                },
            }}>
            <Grow in={open}>
                <div>
                    {withCloseIcon && (
                        <Box
                            sx={{
                                position: 'absolute',
                                zIndex: 3,
                                top: 3,
                                right: 8,
                                cursor: 'pointer',
                                opacity: '.5',
                            }}
                            onClick={onClose}>
                            <Icon
                                name={ICONS_NAMES.Close}
                                vertical
                                color={closeIconColor || theme.palette.white.main}
                                size={15}
                            />
                        </Box>
                    )}
                    {withBackIcon && (
                        <Box
                            sx={{
                                position: 'absolute',
                                zIndex: 3,
                                top: 15,
                                left: 8,
                                cursor: 'pointer',
                                opacity: '.5',
                            }}
                            onClick={onBackClick}>
                            <Icon
                                name={ICONS_NAMES.ArrowLeft}
                                vertical
                                color={backIconColor || theme.palette.white.main}
                                size={15}
                            />
                        </Box>
                    )}
                    {children}
                </div>
            </Grow>
        </MaterialModal>
    );
};

export default Modal;
