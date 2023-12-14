{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
