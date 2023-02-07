import useContentSize from 'hooks/useContentSize';
import HeaderTab from 'pages/Pnft/components/HeaderTab';
import {
  addressAccountSelector,
  isFetchingNftsAccountSelector,
  nftsAccountSelector,
  selectedNftIdsAccountSelector,
} from 'pages/Pnft/Pnft.selectors';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { ShowListType } from './Profile.components';
import ProfileStickyFooter from './Profile.footer';
import ProfileInfo from './Profile.info';
import ProfileListNFT from './Profile.listNFT';
import { Container } from './Profile.styled';

const Profile = () => {
  const [size] = useContentSize();

  const [currentListType, setCurrentListType] = React.useState(ShowListType.all);
  const [selectedDuration, setSelectedDuration] = useState<number | undefined>(24 * 7);

  const address = useSelector(addressAccountSelector);
  const isFetching = useSelector(isFetchingNftsAccountSelector);
  const nfts = useSelector(nftsAccountSelector)(currentListType);
  const selectedNftIds = useSelector(selectedNftIdsAccountSelector);

  const onSelectDuration = (duration?: number) => {
    setSelectedDuration(duration);
  };

  return (
    <div style={{ minHeight: size, width: '100%' }}>
      <Container>
        <HeaderTab />
        <ProfileInfo address={address} />
        <ProfileListNFT
          currentListType={currentListType}
          setCurrentListType={setCurrentListType}
          isFetching={isFetching}
          address={address}
          nfts={nfts}
          selectedNftIds={selectedNftIds}
        />
      </Container>
      <ProfileStickyFooter
        isHidden={selectedNftIds.length <= 0}
        selectedDuration={selectedDuration}
        onSelectDuration={onSelectDuration}
      />
    </div>
  );
};

export default Profile;
