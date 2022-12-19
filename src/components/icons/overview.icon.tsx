import * as React from 'react';

const OverviewIcon = ({ color = '#fff' }: { color: string }) => (
  <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.25 11.25h17.5m-17.5 7.5h6.25m-6.25 7.5h6.25m0 7.5H3.75a2.5 2.5 0 0 1-2.5-2.5V3.75a2.5 2.5 0 0 1 2.5-2.5h17.715a2.5 2.5 0 0 1 1.767.732l4.786 4.786a2.5 2.5 0 0 1 .732 1.767V12.5" />
      <path d="M26.273 35a8.75 8.75 0 1 0 0-17.5 8.75 8.75 0 0 0 0 17.5Zm12.477 3.75-6.29-6.313" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill={color} d="M0 0h40v40H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default OverviewIcon;
