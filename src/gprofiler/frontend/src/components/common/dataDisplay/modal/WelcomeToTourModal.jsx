

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
