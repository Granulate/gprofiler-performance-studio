{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box, Link, List, ListItem, ListItemIcon, Typography } from '@mui/material';

import CopyableParagraph from '@/components/common/dataDisplay/CopyableParagraph';

import Flexbox from '../../common/layout/Flexbox';

const STEPS = [
    'Choose Create cluster',
    'Click Go to Advanced Options',
    `On the Create Cluster - Advanced Options screen:
    In steps 1 and 2 choose the options you prefer and proceed to Step 3: General Cluster Settings`,
];

const AMAZON_LINK = 'https://console.aws.amazon.com/emr';
const S3_DOWNLOAD_lINK = 's3://download.granulate.io/gprofiler_action.sh';

const EMRListItem = ({ icon, textComp }) => {
    return (
        <ListItem sx={{ alignItems: 'flex-start', py: 2, pl: 0 }}>
            <ListItemIcon>
                <Typography sx={{ color: 'success.contrastText' }} variant='h2_lato'>
                    {icon}
                </Typography>
            </ListItemIcon>
            {textComp}
        </ListItem>
    );
};

const EMRNestedList = ({ serviceName, deployCommand }) => (
    <List>
        <EMRListItem
            icon={'A.'}
            textComp={
                <Typography variant='body1_lato' sx={{ pt: 2 }}>
                    Name: Granulate gProfiler
                </Typography>
            }
        />
        <EMRListItem
            icon={'B.'}
            textComp={
                <Typography variant='body1_lato' sx={{ pt: 2 }}>
                    Script Location:
                    <Link sx={{ pointerEvents: 'none' }} target='_blank' rel='noopener' href={S3_DOWNLOAD_lINK}>
                        <strong> {S3_DOWNLOAD_lINK}</strong>
                    </Link>
                </Typography>
            }
        />
        <EMRListItem
            icon={'C.'}
            textComp={
                <Flexbox column spacing={3} sx={{ pt: 2, whiteSpace: 'pre-wrap' }}>
                    <Box>
                        <Typography variant='body1_lato' sx={{ pt: 2, whiteSpace: 'pre-line' }}>
                            Optional Arguments{' '}
                        </Typography>
                    </Box>

                    <Box>{!!serviceName && <CopyableParagraph isCode text={deployCommand} />}</Box>
                </Flexbox>
            }
        />
        <EMRListItem
            icon={'D.'}
            textComp={
                <Typography variant='body1_lato' sx={{ pt: 2 }}>
                    Finish step 4- security, and create the cluster
                </Typography>
            }
        />
    </List>
);

const EMRDeployStepContent = ({ serviceName, apiKey }) => {
    const deployCommand = `--token=${apiKey} --service-name=${serviceName}`;
    return (
        <Flexbox column spacing={5}>
            <List sx={{ pt: 0 }}>
                <EMRListItem
                    icon={1}
                    textComp={
                        <Typography variant='body1_lato' sx={{ pt: 2 }}>
                            Open the Amazon EMR console at
                            <Link target='_blank' rel='noopener' href={AMAZON_LINK}>
                                <strong> {AMAZON_LINK}</strong>
                            </Link>
                        </Typography>
                    }
                />
                {STEPS.map((step, index) => (
                    <EMRListItem
                        key={index}
                        icon={index + 2}
                        textComp={
                            <Typography variant='body1_lato' sx={{ pt: 2, whiteSpace: 'pre-line' }}>
                                {step}
                            </Typography>
                        }
                    />
                ))}

                <EMRListItem
                    sx={{ alignItems: 'flex-start', py: 2, pl: 0 }}
                    icon={5}
                    textComp={
                        <Typography variant='body1_lato' sx={{ pt: 2 }}>
                            Under Bootstrap Actions select Configure and Add, choose Custom Actions, and fill in the
                            following:
                            <EMRNestedList serviceName={serviceName} deployCommand={deployCommand} />
                        </Typography>
                    }
                />
            </List>
        </Flexbox>
    );
};

export default EMRDeployStepContent;
