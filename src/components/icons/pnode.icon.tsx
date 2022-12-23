import * as React from 'react';
const PNodeIcon = ({ color = '#fff' }: { color: string }) => (
  <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33.695 36.364 8.806 2.414C8.235 1.636 7 2.04 7 3.007v33.949a1 1 0 0 0 1 1h24.889a1 1 0 0 0 .806-1.591ZM10.419 1.232C8.705-1.106 5 .106 5 3.006v33.949a3 3 0 0 0 3 3h24.889c2.457 0 3.872-2.792 2.419-4.774L10.419 1.232Z"
      fill={color}
    />
    <rect x={16.443} y={33.594} width={7.282} height={2.08} rx={1.04} fill={color} />
  </svg>
);
export default PNodeIcon;
