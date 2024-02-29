{
    /*
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
     */
}

import SvgIcon from '@mui/material/SvgIcon';

export const DocumentationIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8 3C7.44772 3 7 3.44772 7 4V19C7 19.5523 7.44772 20 8 20H19C19.5523 20 20 19.5523 20 19V4C20 3.44772 19.5523 3 19 3H8ZM19 4H8V19H19V4Z'
                fill='#A0AEC0'
            />
            <path d='M5 6.5V21C5 21.5523 5.44772 22 6 22H17' stroke='#A0AEC0' strokeLinecap='round' fill='none' />
        </SvgIcon>
    );
};

export const OverviewPageIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.2 3.2V20.8H20.8V3.2H3.2ZM3 2C2.44772 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H3ZM11 6C11 5.44772 11.4477 5 12 5H18C18.5523 5 19 5.44772 19 6V7C19 7.55228 18.5523 8 18 8H12C11.4477 8 11 7.55228 11 7V6ZM6 5C5.44772 5 5 5.44772 5 6V7C5 7.55228 5.44772 8 6 8H8C8.55228 8 9 7.55228 9 7V6C9 5.44772 8.55228 5 8 5H6ZM5 11C5 10.4477 5.44772 10 6 10H13C13.5523 10 14 10.4477 14 11V18C14 18.5523 13.5523 19 13 19H6C5.44772 19 5 18.5523 5 18V11ZM17 10C16.4477 10 16 10.4477 16 11V18C16 18.5523 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V11C19 10.4477 18.5523 10 18 10H17Z'
                fill={props.fill || '#ffffff'}
            />
        </SvgIcon>
    );
};
export const ProfilesPageIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.2 20.8V3.2H20.8V20.8H3.2ZM2 3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V3ZM6 11C5.44772 11 5 11.4477 5 12V13C5 13.5523 5.44772 14 6 14H12C12.5523 14 13 13.5523 13 13V12C13 11.4477 12.5523 11 12 11H6ZM5 17C5 16.4477 5.44772 16 6 16H8C8.55228 16 9 16.4477 9 17V18C9 18.5523 8.55228 19 8 19H6C5.44772 19 5 18.5523 5 18V17ZM5 8C5 8.55228 5.44772 9 6 9L18 9C18.5523 9 19 8.55228 19 8V7C19 6.44772 18.5523 6 18 6L6 6C5.44772 6 5 6.44772 5 7V8Z'
                fill={props.fill || '#ffffff'}
            />
        </SvgIcon>
    );
};
export const ComparisonPageIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.2 3.2V14.8H8V8C8 7.44772 8.44772 7 9 7H14.8V3.2H3.2ZM16 7V3C16 2.44772 15.5523 2 15 2H3C2.44772 2 2 2.44772 2 3V15C2 15.5523 2.44772 16 3 16H8V20C8 20.5523 8.44772 21 9 21H21C21.5523 21 22 20.5523 22 20V8C22 7.44772 21.5523 7 21 7H16ZM14.8 8.2H9.2V14.8H14.8V8.2ZM9.2 16H15C15.5523 16 16 15.5523 16 15V8.2H20.8V19.8H9.2V16ZM10 10C10 9.44772 10.4477 9 11 9H13C13.5523 9 14 9.44772 14 10V13C14 13.5523 13.5523 14 13 14H11C10.4477 14 10 13.5523 10 13V10Z'
                fill={props.fill || '#ffffff'}
            />
        </SvgIcon>
    );
};
