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

import { Divider, Typography } from '@mui/material';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

import useTableSearch, { searchWithRegex } from '@/components/common/dataDisplay/table/useTableSearch';
import Flexbox from '@/components/common/layout/Flexbox';

import MuiTable from '../../common/dataDisplay/table/MuiTable';
import { SERVICES_TABLE_COLUMNS } from './ServicesTableColumns';
import ServicesTableEmptyState from './ServicesTableEmptyState';
import ServicesTableSearch from './ServicesTableSearch';

const ServicesTable = ({ services = [] }) => {
    const [nodes, setNodes] = useState(0);
    const [cores, setCores] = useState(0);
    const [servicesCount, setServicesCount] = useState(0);

    const { tableSearchProps, setOpenSearch, searchText } = useTableSearch();

    const [servicesTableColumns, setServicesTableColumns] = useState(SERVICES_TABLE_COLUMNS(setOpenSearch));

    useEffect(() => {
        setServicesTableColumns(SERVICES_TABLE_COLUMNS(setOpenSearch));
    }, [setOpenSearch]);

    const servicesData = useMemo(() => {
        const servicesMap = _.map(services, (service, id) => {
            return { ...service, id };
        });
        return searchWithRegex(searchText, servicesMap, (row) => row['name']);
    }, [services, searchText]);

    useEffect(() => {
        if (servicesData) {
            setCores(_.sumBy(servicesData, 'cores') || 0);
            setNodes(_.sumBy(servicesData, 'nodes') || 0);
            setServicesCount(servicesData?.length || 0);
        }
    }, [servicesData]);
    const shouldShowAddService = servicesData?.length > 0 && servicesData?.length < 3;

    const data = [
        { label: 'Nodes', value: nodes },
        { label: 'Cores', value: cores },
    ];
    return (
        <Flexbox column sx={{ mt: 8, height: '100%', position: 'relative' }} spacing={2}>
            <Flexbox justifyContent='space-between' alignItems='center' sx={{ mb: 3 }}>
                <Typography variant='h2_lato'>Services | {servicesCount}</Typography>
                <Flexbox
                    spacing={3}
                    alignItems='center'
                    justifyContent='space-evenly'
                    divider={<Divider orientation='vertical' flexItem />}
                    sx={{
                        p: 3,
                        height: '100%',
                        borderRadius: 2,
                        backgroundColor: 'white.main',
                    }}>
                    {data.map((info) => (
                        <Flexbox spacing={2} alignItems='baseline' key={info.label}>
                            <Typography variant='h2_lato' sx={{ fontWeight: 'bold' }}>
                                {info.value}
                            </Typography>
                            <Typography variant='caption'>{info.label}</Typography>
                        </Flexbox>
                    ))}
                </Flexbox>
            </Flexbox>
            <MuiTable
                pageSize={6}
                data={servicesData}
                columns={servicesTableColumns}
                rowHeight={55}
                padding={0}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'createDate', sort: 'desc' }],
                    },
                }}
                search={{
                    component: ServicesTableSearch,
                    props: tableSearchProps,
                }}
                emptyStateComponent={ServicesTableEmptyState}
                hideFooter={!shouldShowAddService && servicesData?.length < 7}
                footer={shouldShowAddService ? <ServicesTableEmptyState /> : undefined}
            />
        </Flexbox>
    );
};

ServicesTable.propTypes = {
    services: PropTypes.array,
};

export default ServicesTable;
