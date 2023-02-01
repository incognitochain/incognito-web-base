import useContentSize from 'hooks/useContentSize';

import ProfileStickyFooter from './Profile.footer';
import ProfileInfo from './Profile.info';
import ProfileListNFT from './Profile.listNFT';
import { Container } from './Profile.styled';

const Profile = () => {
  const [size] = useContentSize();

  return (
    <div style={{ minHeight: size, width: '100%' }}>
      <Container>
        <ProfileInfo />
        <ProfileListNFT />
      </Container>
      <ProfileStickyFooter />
    </div>
  );
};

export default Profile;
