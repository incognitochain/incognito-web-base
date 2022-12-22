import * as React from 'react';
const ExplorerIcon = ({ color = '#fff' }: { color: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.65 38.567c-.878.12-1.763.181-2.65.183a18.75 18.75 0 1 1 18.584-21.3 19.38 19.38 0 0 1 0 5.2" />
      <path d="M15.483 38.2C12.95 34.483 11.25 27.717 11.25 20c0-7.717 1.667-14.483 4.233-18.2M1.25 20H17.5m10 0h11.25M3.9 10.417h32.2M3.9 29.583h14.85M24.518 1.8c3 4.4 4.083 11.667 4.216 16.95M22.1 23.333l6.834 15a.9.9 0 0 0 1.667-.166l2-5.534 5.533-2a.9.9 0 0 0 .15-1.666l-15-6.834a.933.933 0 0 0-1.183 1.2v0Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill={color} d="M0 0h40v40H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default ExplorerIcon;
