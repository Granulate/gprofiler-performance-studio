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

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { matchSorter } from 'match-sorter';
import { memo, useCallback, useContext, useEffect } from 'react';

import Tooltip from '@/components/common/dataDisplay/muiToolTip/Tooltip';
import Flexbox from '@/components/common/layout/Flexbox';
import AutoCompleteSelect from '@/components/common/selectors/autoComplete/AutoCompleteSelect';
import useRightClickContextMenu from '@/hooks/useRightClickContextMenu';
import { FilterTagsContext } from '@/states/filters/FiltersTagsContext';
import { WarningIcon } from '@/svg';
import { ServiceIcon } from '@/svg/topPanelIcons';
import { COLORS } from '@/theme/colors';
import { COPY_ONLY_IN_HTTPS } from '@/utils/consts';
import { isPathSecure } from '@/utils/generalUtils';

import ClusterTypeIconAndText from './ClusterTypeIcon';

const ServiceNameSelectOptionWithTooltip = ({ name, type, hasData, visibilityHidden, inputValue }) => {
    const matches = match(name, inputValue, { insideWords: true });
    const parts = parse(name, matches);

    return (
        <Box sx={{ width: !hasData ? '93%' : '100%' }} alignItems='center'>
            <Flexbox alignItems='center' spacing={3}>
                <ClusterTypeIconAndText type={type} />
                <Tooltip
                    content={name}
                    size='small'
                    placement='bottom-start'
                    delay={[500, 0]}
                    maxWidth={'none'}
                    arrow={false}
                    followCursor={true}>
                    <Typography noWrap variant='body1_lato' color={visibilityHidden ? COLORS.GREY_2 : 'inherit'}>
                        {parts.map((part, index) => (
                            <span
                                key={index}
                                style={{
                                    fontWeight: part.highlight ? 700 : 400,
                                }}>
                                {part.text}
                            </span>
                        ))}
                    </Typography>
                </Tooltip>
            </Flexbox>
        </Box>
    );
};

const ServiceOptionItem = ({ option, moreProps, style }) => {
    const { hasData, envType, name } = option;
    const { inputValue, ...props } = moreProps;

    return (
        <Box component='li' {...props} sx={{ ...style, width: '100%' }}>
            <ServiceNameSelectOptionWithTooltip
                name={name}
                type={envType}
                hasData={hasData}
                visibilityHidden={false}
                inputValue={inputValue}
            />
            {!hasData && (
                <Tooltip
                    size='small'
                    arrow={false}
                    content='This service has no data available to display'
                    placement='right'>
                    <Box sx={{ px: 2 }}>
                        <WarningIcon />
                    </Box>
                </Tooltip>
            )}
        </Box>
    );
};

const customRowRender = (props) => {
    const { data, index, style } = props;
    const dataSet = data[index];
    const inlineStyle = {
        ...style,
        alignItems: 'center',
    };

    return <ServiceOptionItem moreProps={dataSet[0]} style={inlineStyle} option={dataSet[1]} />;
};

const ServicesSelect = ({ setSelectedService, selectedService, selectedServiceEnvType, disabled, services }) => {
    const { resetActiveTagFilters } = useContext(FilterTagsContext);

    const { handleClose, handleContextMenu, contextMenu } = useRightClickContextMenu();

    const handleCopyAndClose = useCallback(() => {
        if (isPathSecure()) {
            navigator.clipboard.writeText(selectedService);
        }
        handleClose();
    }, [handleClose, selectedService]);

    useEffect(() => {
        if (selectedService) {
            resetActiveTagFilters();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedService]);

    return (
        <>
            <AutoCompleteSelect
                icon={
                    selectedServiceEnvType ? (
                        <Flexbox spacing={1} alignItems='center'>
                            <ClusterTypeIconAndText type={selectedServiceEnvType} color={COLORS.BLACK} small />
                        </Flexbox>
                    ) : (
                        <ServiceIcon />
                    )
                }
                placeholder='Service view name'
                onChange={(option) => setSelectedService(option.name)}
                customRowRender={customRowRender}
                options={services}
                disabled={disabled}
                optionKey='name'
                selectedOptions={selectedService}
                onRightClick={handleContextMenu}
                filterOptions={(options, { inputValue }) => {
                    return matchSorter(options, inputValue, {
                        keys: ['name'],
                        baseSort: (a, b) => (a.hasData && !b.hasData ? -1 : 1),
                    });
                }}
            />
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference='anchorPosition'
                MenuListProps={{ sx: { padding: 0 } }}
                anchorPosition={
                    contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
                }>
                <MenuItem onClick={handleCopyAndClose} sx={{ typography: 'body1_lato' }}>
                    {!isPathSecure() ? `Copy - ${COPY_ONLY_IN_HTTPS}` : 'Copy'}
                </MenuItem>
            </Menu>
        </>
    );
};

export default memo(ServicesSelect);
