{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { useState } from 'react';

import WelcomeToTourCard from '../card/WelcomeToTourCard';
import Modal from './Modal';

const WelcomeToTourModal = () => {
    const [openModalId, setOpenModalId] = useState('welcome-tour-overview-screen');
    const onClose = () => setOpenModalId(null);
    return (
        <Modal open={openModalId === 'welcome-tour-overview-screen'} onClose={onClose} variant='welcomeToTour'>
            <WelcomeToTourCard
                onClose={onClose}
                onCtaClick={() => {
                    setOpenModalId(null);
                }}
            />
        </Modal>
    );
};

export default WelcomeToTourModal;
