import Placeholder from 'assets/images/placeholder.png';
import React, { memo } from 'react';

function ImagePlacholder({ src, className }: { src?: string; className: any }) {
  return <img src={src || Placeholder} className={className} alt="" loading="lazy" />;
}

export default memo(ImagePlacholder);
