import * as React from 'react';

const UnknowIcon = ({ size = 120 }: { size?: number }) => (
  <svg width={size} height={size} viewBox={`"0 0 ${size} ${size}"`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M59.9964 119.235C27.4173 119.235 0.761719 92.5797 0.761719 59.7051C1.05789 27.1267 27.4173 0.471658 60.2926 0.767825C92.8716 1.06399 119.231 27.4229 119.231 60.5936C118.935 92.8758 92.5755 119.235 59.9964 119.235Z"
      fill="#1A1A1A"
    />
    <path
      d="M60 0C48.1331 0 36.5328 3.51894 26.6658 10.1118C16.7989 16.7047 9.10851 26.0754 4.56725 37.039C0.0259972 48.0026 -1.1622 60.0665 1.15291 71.7054C3.46802 83.3443 9.18247 94.0352 17.5736 102.426C25.9648 110.818 36.6557 116.532 48.2946 118.847C59.9335 121.162 71.9975 119.974 82.961 115.433C93.9246 110.891 103.295 103.201 109.888 93.3342C116.481 83.4673 120 71.8669 120 60C120 44.087 113.679 28.8258 102.426 17.5736C91.1742 6.32141 75.913 0 60 0V0ZM60 95C58.5167 95 57.0666 94.5601 55.8332 93.736C54.5999 92.9119 53.6386 91.7405 53.0709 90.3701C52.5033 88.9997 52.3547 87.4917 52.6441 86.0368C52.9335 84.582 53.6478 83.2456 54.6967 82.1967C55.7456 81.1478 57.082 80.4335 58.5368 80.1441C59.9917 79.8547 61.4997 80.0032 62.8701 80.5709C64.2406 81.1385 65.4119 82.0998 66.236 83.3332C67.0602 84.5666 67.5 86.0166 67.5 87.5C67.5 89.4891 66.7098 91.3968 65.3033 92.8033C63.8968 94.2098 61.9891 95 60 95ZM68 64.6C67.1056 64.9903 66.345 65.6339 65.8119 66.4512C65.2789 67.2686 64.9966 68.2241 65 69.2C65 70.5261 64.4732 71.7978 63.5356 72.7355C62.5979 73.6732 61.3261 74.2 60 74.2C58.6739 74.2 57.4022 73.6732 56.4645 72.7355C55.5268 71.7978 55 70.5261 55 69.2C54.9996 66.2809 55.8509 63.4252 57.4495 60.9828C59.0481 58.5405 61.3247 56.6176 64 55.45C65.651 54.7294 67.0768 53.5762 68.1265 52.1123C69.1763 50.6484 69.8111 48.9281 69.9639 47.1331C70.1167 45.3382 69.7818 43.5353 68.9947 41.915C68.2075 40.2947 66.9972 38.9171 65.4917 37.9278C63.9863 36.9385 62.2416 36.3742 60.4419 36.2946C58.6422 36.215 56.8545 36.623 55.2676 37.4755C53.6806 38.328 52.3535 39.5934 51.4263 41.1378C50.4991 42.6823 50.0063 44.4486 50 46.25C50 47.5761 49.4732 48.8478 48.5356 49.7855C47.5979 50.7232 46.3261 51.25 45 51.25C43.6739 51.25 42.4022 50.7232 41.4645 49.7855C40.5268 48.8478 40 47.5761 40 46.25C40.0036 42.645 40.9814 39.1081 42.8301 36.0132C44.6788 32.9184 47.3297 30.3808 50.5022 28.6688C53.6747 26.9568 57.251 26.1342 60.8527 26.2879C64.4544 26.4416 67.9475 27.5659 70.9627 29.5419C73.9779 31.5179 76.4029 34.2721 77.9812 37.5132C79.5596 40.7543 80.2325 44.3617 79.929 47.9538C79.6254 51.546 78.3566 54.9893 76.2567 57.9196C74.1569 60.8498 71.304 63.158 68 64.6Z"
      fill="#EDF0F4"
    />
  </svg>
);

export default UnknowIcon;
