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



import { Link, Typography } from '@mui/material';
import { useState } from 'react';

import { CardIconWhatIsProfiling } from '../../../svg';
import Card from '../../common/dataDisplay/card/Card';
import Modal from '../../common/dataDisplay/modal/Modal';
import Flexbox from '../../common/layout/Flexbox';

const ProfillerVideoCard = () => {
    const [videoModalOpen, setVideoModalOpen] = useState(false);

    return (
        <Card sxOverrides={{ maxWidth: '600px', margin: 'auto' }}>
            <Flexbox justifyContent='center'>
                <CardIconWhatIsProfiling />
            </Flexbox>
            <Typography variant='h3' sx={{ mt: 5 }}>
                What is code profiling?
            </Typography>
            <Flexbox column sx={{ mt: 7, textAlign: 'center' }}>
                <Link onClick={() => setVideoModalOpen(true)}>
                    <img
                        width='100%'
                        style={{ maxWidth: '300px', height: 'auto', margin: 'auto' }}
                        alt='Video'
                        src={'images/welcome-page-video-placeholder.png'}
                    />
                </Link>
            </Flexbox>
            <Modal
                overrideSx={{ width: '100%', margin: 'auto', height: '576px' }}
                open={videoModalOpen}
                onClose={() => setVideoModalOpen(false)}>
                <iframe
                    title='video modal'
                    frameBorder='0'
                    style={{ display: 'block', width: '100%', height: '576px', borderRadius: '5PX' }}
                    src='https://www.youtube.com/embed/9haHv8HIJQQ?autoplay=1&rel=0'
                />
            </Modal>
        </Card>
    );
};

export default ProfillerVideoCard;
