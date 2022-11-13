import React from 'react';
import { ThemedText } from 'theme';

const MarketTitleBox = () => {
  return (
    <ThemedText.LargeHeader fontWeight={500} fontSize={34} color="text1" textAlign={'center'}>
      The privacy marketplace for crypto assets
    </ThemedText.LargeHeader>
  );
};

export default React.memo(MarketTitleBox);
