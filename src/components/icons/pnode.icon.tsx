import * as React from 'react';
const PNodeIcon = ({ color = '#fff' }: { color: string }) => (
  <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="a" fill={color}>
      <path d="M5 3.006c0-2.9 3.705-4.112 5.42-1.774l24.888 33.95c1.453 1.98.038 4.773-2.42 4.773H8a3 3 0 0 1-3-3V3.005Z" />
    </mask>
    <path
      d="M10.42 1.232 8.805 2.415l1.614-1.183Zm24.888 33.95 1.613-1.183-1.613 1.182ZM7 3.005c0-.967 1.235-1.371 1.806-.591L12.032.05C9.175-3.848 3-1.827 3 3.006h4Zm1.806-.591 24.889 33.949 3.226-2.365L12.032.049 8.806 2.416Zm24.889 33.949a1 1 0 0 1-.806 1.59v4c4.095 0 6.453-4.653 4.032-7.955l-3.226 2.365Zm-.806 1.59H8v4h24.889v-4ZM8 37.955a1 1 0 0 1-1-1H3a5 5 0 0 0 5 5v-4Zm-1-1V3.007H3v33.949h4Z"
      fill={color}
      mask="url(#a)"
    />
    <rect x={16.443} y={33.594} width={7.282} height={2.08} rx={1.04} fill="#9C9C9C" />
  </svg>
);
export default PNodeIcon;
