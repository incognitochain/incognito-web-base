import Row from 'components/Core/Row';
import DefaultAvatar from 'pages/Pnft/images/default_avatar.svg';
import styled from 'styled-components/macro';

const InfoStyled = styled.div`
  margin-bottom: 24px;

  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 32px;
  }

  .address {
    font-size: 20px;
    font-weight: 500;
    margin-left: 16px;
  }
`;

const ProfileInfo = () => {
  return (
    <InfoStyled>
      <Row>
        <img alt="avatar" className="avatar" src={DefaultAvatar}></img>
        <p className="address">8019283fawd</p>
      </Row>
    </InfoStyled>
  );
};

export default ProfileInfo;
