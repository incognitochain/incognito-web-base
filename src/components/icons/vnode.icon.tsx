import * as React from 'react';
const VNodeIcon = ({ color = '#fff' }: { color: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M26.25 38.75h-12.5l1.25-7.5h10l1.25 7.5Zm-16.25 0h20M1.25 24.583h37.5" />
      <path d="M33.75 1.25H6.25a5 5 0 0 0-5 5v20a5 5 0 0 0 5 5h27.5a5 5 0 0 0 5-5v-20a5 5 0 0 0-5-5Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path stroke={color} d="M0 0h40v40H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default VNodeIcon;
