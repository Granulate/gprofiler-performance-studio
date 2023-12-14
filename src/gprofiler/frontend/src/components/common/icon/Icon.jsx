{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import PropTypes from 'prop-types';

import IconBase from './IconBase';
import { ICONS, VIEW_BOXES } from './iconsData';

const Icon = (props) => {
    return (
        <IconBase
            icon={ICONS[props.name]}
            viewbox={VIEW_BOXES[props.name] || props.viewBox}
            color={props.color}
            hoverColor={props.hoverColor}
            width={props.width}
            height={props.height}
            size={props.size}
            margin={props.margin}
            marginLeft={props.marginLeft}
            marginRight={props.marginRight}
            verticalAlign={props.vertical}
            verticalFlip={props.flip}
            rotate={props.rotate}
            altText={props.alt}
            ref={props.ref}
            spin={props.spin}
        />
    );
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    size: PropTypes.number,
    viewBox: PropTypes.number,
    margin: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    vertical: PropTypes.bool,
    flip: PropTypes.bool,
    rotate: PropTypes.number,
    spin: PropTypes.bool,
    alt: PropTypes.string,
    ref: PropTypes.any,
    height: PropTypes.number,
    width: PropTypes.number,
};

export default Icon;
