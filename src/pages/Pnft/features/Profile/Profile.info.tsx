import CopyIcon from 'components/Copy';
import Row from 'components/Core/Row';
import { setAddress } from 'pages/Pnft';
import DefaultAvatar from 'pages/Pnft/images/default_avatar.svg';
import IcEtherScan from 'pages/Pnft/images/ic-ether-scan.svg';
import React from 'react';
import styled from 'styled-components/macro';
import { shortenString } from 'utils';

import { useAppDispatch } from '../../../../state/hooks';
import useButtonMetamask from './Profile.useButtonMetamask';

const InfoStyled = styled.div`
  margin-bottom: 24px;

  .content {
    width: fit-content;
    padding: 4px 6px;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.color_grey3};
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 16px;
  }

  .address {
    margin-left: 8px;
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    margin-right: 8px;
  }

  .ic {
    width: 20px;
    height: 20px;
    margin-left: 8px;

    :hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;

interface ProfileInfoProps {
  address: string;
}

const ProfileInfo = (props: ProfileInfoProps) => {
  const { address } = props;
  const dispatch = useAppDispatch();

  const { button, component, address: web3Address } = useButtonMetamask();

  const onClickEtherScan = () => {
    window.open(`https://etherscan.io/address/${address}`);
  };

  React.useEffect(() => {
    dispatch(setAddress(web3Address || ''));
  }, [web3Address]);

  if (button.text || !address) {
    return component;
  }

  return (
    <InfoStyled>
      <Row className="content">
        <img alt="avatar" className="avatar" src={DefaultAvatar}></img>
        <p className="address">{shortenString(address, 10)}</p>
        <CopyIcon text={address} />
        <img className="ic" alt="ic-ether" src={IcEtherScan} onClick={onClickEtherScan} />
      </Row>
    </InfoStyled>
  );
};

export default React.memo(ProfileInfo);
