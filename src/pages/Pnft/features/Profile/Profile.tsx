import ProfileInfo from './Profile.info';
import ProfileListNFT from './Profile.listNFT';
import { Container } from './Profile.styled';

const Profile = () => {
  return (
    <Container>
      <ProfileInfo />
      <ProfileListNFT />
    </Container>
  );
};

export default Profile;
