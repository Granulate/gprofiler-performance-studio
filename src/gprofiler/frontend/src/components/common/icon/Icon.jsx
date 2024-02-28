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
