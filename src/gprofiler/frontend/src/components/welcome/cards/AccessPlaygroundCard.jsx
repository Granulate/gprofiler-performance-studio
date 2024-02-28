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

import Typography from '@mui/material/Typography';

import { CardIconAccessPlayground } from '../../../svg';
import { DEMO_URL } from '../../../utils/consts';
import Button from '../../common/button/Button';
import Card from '../../common/dataDisplay/card/Card';
import Flexbox from '../../common/layout/Flexbox';

const AccessPlaygroundCard = () => {
    return (
        <Card sxOverrides={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', margin: 'auto' }}>
            <Flexbox justifyContent='center'>
                <CardIconAccessPlayground />
            </Flexbox>
            <Typography variant='h3' sx={{ mt: 5 }}>
                Access Playground
            </Typography>
            <Flexbox sx={{ height: '100%' }}>
                <Typography variant='body1' sx={{ mt: 5 }}>
                    See gProfiler in action inside a live, interactive demo. Put it to the test before deploying it on
                    your environments!
                </Typography>
            </Flexbox>
            <Flexbox justifyContent='flex-start' sx={{ marginTop: 5 }}>
                <Button size='large' href={DEMO_URL}>
                    Watch in action
                </Button>
            </Flexbox>
        </Card>
    );
};

export default AccessPlaygroundCard;
