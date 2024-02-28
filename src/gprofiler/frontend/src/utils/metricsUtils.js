

const toFixedNumber = (num) => parseFloat(Number.parseFloat(num).toFixed(1));

export const parseCPUValue = (value) => {
    return `${toFixedNumber(value?.avg_cpu)}% avg${!value?.max_cpu ? '' : ` - ${toFixedNumber(value?.max_cpu)}% max`}`;
};
export const parseMemoryValue = (value) =>
    `${toFixedNumber(value?.avg_memory)}% avg${
        !value?.max_memory ? '' : ` - ${toFixedNumber(value?.max_memory)}% max`
    }`;
