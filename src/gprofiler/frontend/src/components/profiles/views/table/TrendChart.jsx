

import { COLORS } from '@/theme/colors';

const TrendChart = ({ direction = 'up', svgPrefix = 'prefix' }) => {
    const chartHigher = (
        <svg width={114} height={52} fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path fill='#fff' d='M0 0h114v52H0z' />
            <path opacity={0.2} d='M2.5 23.5L112 1.5' stroke='#000' />
            <path d='M0 24.5a2.5 2.5 0 015 0V52H0V24.5z' fill={`url(#${svgPrefix}__paint0_linear)`} />
            <path d='M109 2.5a2.5 2.5 0 115 0V52h-5V2.5z' fill={`url(#${svgPrefix}__paint1_linear)`} />
            <defs>
                <linearGradient
                    id={`${svgPrefix}__paint0_linear`}
                    x1={2.5}
                    y1={27.769}
                    x2={2.5}
                    y2={52}
                    gradientUnits='userSpaceOnUse'>
                    <stop stopColor={COLORS.YELLOW} />
                    <stop offset={1} stopColor={COLORS.SECONDARY_ORANGE} />
                </linearGradient>
                <linearGradient
                    id={`${svgPrefix}__paint1_linear`}
                    x1={113.978}
                    y1={85.921}
                    x2={79.19}
                    y2={74.853}
                    gradientUnits='userSpaceOnUse'>
                    <stop stopColor={COLORS.BLUE_6} />
                    <stop offset={1} stopColor={COLORS.PURPLE} />
                </linearGradient>
            </defs>
        </svg>
    );

    const chartLower = (
        <svg width={114} height={52} fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path opacity={0.2} d='M4 2.5l107.5 22' stroke='#000' />
            <path d='M0 2.5a2.5 2.5 0 015 0V52H0V2.5z' fill={`url(#${svgPrefix}__paint0_linear)`} />
            <path d='M109 24.5a2.5 2.5 0 115 0V52h-5V24.5z' fill={`url(#${svgPrefix}__paint1_linear)`} />
            <defs>
                <linearGradient
                    id={`${svgPrefix}__paint0_linear`}
                    x1={2.5}
                    y1={10}
                    x2={2.5}
                    y2={52}
                    gradientUnits='userSpaceOnUse'>
                    <stop stopColor={COLORS.YELLOW} />
                    <stop offset={1} stopColor={COLORS.SECONDARY_ORANGE} />
                </linearGradient>
                <linearGradient
                    id={`${svgPrefix}__paint1_linear`}
                    x1={113.978}
                    y1={71.57}
                    x2={84.602}
                    y2={55.37}
                    gradientUnits='userSpaceOnUse'>
                    <stop stopColor={COLORS.BLUE_6} />
                    <stop offset={1} stopColor={COLORS.PURPLE} />
                </linearGradient>
            </defs>
        </svg>
    );

    return direction === 'up' ? chartHigher : chartLower;
};

export default TrendChart;
