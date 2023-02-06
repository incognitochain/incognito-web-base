import useContentSize from 'hooks/useContentSize';
import { useState } from 'react';

import ProfileStickyFooter from './Profile.footer';
import ProfileInfo from './Profile.info';
import ProfileListNFT from './Profile.listNFT';
import { Container } from './Profile.styled';
import ProfileSubRoute from './Profile.SubRoute';

const Profile = () => {
  const [size] = useContentSize();

  const [selectedDuration, setSelectedDuration] = useState<number | undefined>(24 * 7);

  const onSelectDuration = (duration?: number) => {
    setSelectedDuration(duration);
  };

  return (
    <div style={{ minHeight: size, width: '100%' }}>
      <Container>
        <ProfileSubRoute />
        <ProfileInfo />
        <ProfileListNFT />
      </Container>
      <ProfileStickyFooter selectedDuration={selectedDuration} onSelectDuration={onSelectDuration} />
    </div>
  );
};

export default Profile;
