{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box, Typography } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { useCallback, useContext } from 'react';

import Tooltip from '@/components/common/dataDisplay/muiToolTip/Tooltip';
import Flexbox from '@/components/common/layout/Flexbox';
import AutoCompleteSelect from '@/components/common/selectors/autoComplete/AutoCompleteSelect';
import { COLORS } from '@/theme/colors';

import { SelectorsContext } from '../../states';

const filter = createFilterOptions();

const serviceNameRegex = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9+_]+$/);

const testServiceNameInputAndFilter = (filtered, input) => {
    if (input !== '') {
        if (!serviceNameRegex.test(input)) {
            filtered.push({
                inputValue: ' ',
                name: `Please use only [a-z,A-Z,0-9,+,_] characters`,
                key: ' ',
                disabled: true,
            });
            filtered.push({
                inputValue: '',
                name: `Name cannot start with _ or +`,
                key: ' ',
                disabled: true,
            });
            filtered.push({
                inputValue: '',
                name: `Name must be at least 2 characters`,
                key: ' ',
                disabled: true,
            });
        } else if (!filtered.find((service) => service.name === input)) {
            filtered.push({
                inputValue: input,
                name: `Add "${input}"`,
                key: input,
            });
        }
    }
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

const disabledProps = {
    onClick: (e) => {
        e.preventDefault();
    },
};
const ServiceOptionItem = ({ option, moreProps, style }) => {
    const { name, visibilityState, disabled } = option;
    const { inputValue, ...props } = moreProps;
    const newProps = {
        ...props,
        ...(disabled ? disabledProps : {}),
    };
    return (
        <Box component='li' {...newProps} sx={{ ...style, width: '100%' }}>
            <ServiceNameSelectOptionWithTooltip
                name={name}
                inputValue={inputValue}
                visibilityHidden={false}
                disabled={disabled}
            />
        </Box>
    );
};

const ServiceNameSelectOptionWithTooltip = ({ name, visibilityHidden, inputValue, disabled }) => {
    const matches = match(name, inputValue, { insideWords: true });
    const parts = parse(name, matches);

    return (
        <Tooltip
            content={disabled ? '' : name}
            size='small'
            placement='bottom-start'
            delay={[500, 0]}
            maxWidth={'none'}
            arrow={false}
            followCursor={true}>
            <Box sx={{ width: '100%' }}>
                <Flexbox alignItems='center' spacing={2}>
                    <Typography
                        noWrap
                        variant='body1_lato'
                        color={disabled ? COLORS.ERROR_RED : visibilityHidden ? COLORS.GREY_2 : 'inherit'}>
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
                </Flexbox>
            </Box>
        </Tooltip>
    );
};

const ServiceNameForm = ({
    serviceName,
    setServiceName,
    disabled = false,
    helperComponent: HelperComponent,
    helperComponentProps,
}) => {
    const { services } = useContext(SelectorsContext);

    const onChange = useCallback(
        (value) => {
            setServiceName(value ? (value.key ? value.key : value.name) : undefined);
        },
        [setServiceName]
    );
    return (
        <>
            <Box sx={{ maxWidth: '600px', borderBottom: disabled ? '' : '1px solid' }}>
                <AutoCompleteSelect
                    placeholder={serviceName || 'Service name'}
                    onChange={onChange}
                    customRowRender={customRowRender}
                    options={services}
                    disabled={disabled}
                    optionKey='name'
                    selectedOptions={undefined}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        testServiceNameInputAndFilter(filtered, params.inputValue);

                        return filtered;
                    }}
                />
            </Box>
            {HelperComponent && <HelperComponent {...helperComponentProps} />}
        </>
    );
};

export default ServiceNameForm;