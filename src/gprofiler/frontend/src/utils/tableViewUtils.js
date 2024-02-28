

export const getFunctioNameEdges = (functionName, coreFunctionName) => {
    const coreFunctionIndex = functionName.indexOf(coreFunctionName);
    const coreFunctionLength = coreFunctionName.length;

    const nameStart = functionName.substring(0, coreFunctionIndex);
    const nameEnd = functionName.substring(coreFunctionIndex + coreFunctionLength, functionName.length);
    return { start: nameStart, end: nameEnd };
};
