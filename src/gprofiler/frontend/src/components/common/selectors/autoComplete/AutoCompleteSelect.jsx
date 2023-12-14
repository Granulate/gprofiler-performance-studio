{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createContext, forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { VariableSizeList } from 'react-window';

import Dropdown from '../dropdown/Dropdown';

const LISTBOX_PADDING = 0;

const StyledInput = styled(InputBase)(({ theme }) => ({
    width: '100%',
    padding: '8px',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
    '& input': {
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
        padding: 8,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        border: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
        fontSize: 14,
    },
}));

const OuterElementContext = createContext({});

const OuterElementType = forwardRef((props, ref) => {
    const outerProps = useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});
OuterElementType.displayName = 'OuterElementType';
function useResetCache(data) {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

// Adapter for react-window
const ListboxComponent = forwardRef(function ListboxComponent(props, ref) {
    const { children, customRowRender, ...other } = props;
    const itemData = [];
    children.forEach((item) => {
        itemData.push(item);
        itemData.push(...(item.children || []));
    });

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
        noSsr: true,
    });

    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = () => {
        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);
    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    width='100%'
                    ref={gridRef}
                    outerElementType={OuterElementType}
                    innerElementType='ul'
                    itemSize={(index) => getChildSize(itemData[index])}
                    overscanCount={5}
                    itemCount={itemCount}>
                    {customRowRender}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

function PopperComponent(props) {
    const { disablePortal, anchorEl, open, ...other } = props;
    return <StyledAutocompletePopper {...other} />;
}

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: 'none',
        margin: 0,
        color: 'inherit',
        fontSize: 13,
        width: '100%',
    },
    [`& .${autocompleteClasses.listbox}`]: {
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
            minHeight: 'auto',
            alignItems: 'flex-start',
            padding: 8,
            borderBottom: `1px solid  ${theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'}`,
        },
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: 'relative',
    },
}));

export default function AutoCompleteSelect({
    placeholder = 'title missing',
    icon = undefined,
    onChange,
    options,
    disabled,
    disablePortal = false,
    selectedOptions,
    noOptionsText = 'No options',
    customTop = undefined,
    customRowRender = undefined,
    optionKey = '',
    onRightClick = undefined,
    filterOptions = undefined,
}) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const hasSelected = !!selectedOptions;
    return (
        <Dropdown
            title={hasSelected ? selectedOptions : placeholder}
            icon={icon}
            customWidth='400px'
            disabled={disabled}
            customHeight='345px'
            open={open}
            disablePortal={disablePortal}
            onRightClick={onRightClick}
            setOpen={setOpen}>
            {customTop}
            <Autocomplete
                open={open}
                disabled={disabled}
                disableListWrap
                PopperComponent={PopperComponent}
                ListboxComponent={ListboxComponent}
                ListboxProps={{ customRowRender: customRowRender }}
                onClose={(event, reason) => {
                    if (reason === 'escape') {
                        setOpen(false);
                    }
                }}
                getOptionLabel={(option) => option[optionKey] || ''}
                value={selectedOptions}
                inputValue={inputValue}
                isOptionEqualToValue={(option, value) => option[optionKey] === value}
                onInputChange={(event, value, reason) => {
                    if (event && event.type === 'blur') {
                        setInputValue('');
                    } else if (reason !== 'reset') {
                        setInputValue(value);
                    }
                }}
                onChange={(event, newValue) => {
                    if (!newValue || (event.type === 'keydown' && event.key === 'Backspace')) {
                        return;
                    }
                    onChange(newValue);
                    setOpen(false);
                }}
                disableCloseOnSelect
                renderTags={() => null}
                noOptionsText={noOptionsText}
                renderOption={(props, option, { selected, inputValue }) => [{ ...props, selected, inputValue }, option]}
                options={options}
                renderInput={(params) => (
                    <StyledInput
                        ref={params.InputProps.ref}
                        inputProps={params.inputProps}
                        autoFocus
                        placeholder='Filter'
                    />
                )}
                filterOptions={filterOptions}
            />
        </Dropdown>
    );
}
