import CheckIconSrc from 'assets/svg/ic-check.svg';
import { Typography } from 'components/Core';
import { PRV } from 'constants/token';
import { useFuse } from 'hooks/useFuse';
import orderBy from 'lodash/orderBy';
import PToken from 'models/model/pTokenModel';
import CoinsInfoModal from 'pages/IncWebWallet/components/CoinsInfo/CoinsInfoModal';
import { setFollowTokenSelectedByToken } from 'pages/IncWebWallet/state/followTokenSelected.actions';
import SearchTokenBar from 'pages/Swap/features/Selection/SearchTokenBar';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import { incognitoAccountFollowTokenIDs } from 'state/incognitoWallet';
import { getPrivacyDataByTokenIDSelector } from 'state/token';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import Column from '../Core/Column';
import { Image } from '../Core/Image';
import Row from '../Core/Row';
import { useModal } from './Modal.provider';

interface IProps {
  tokens: PToken[];
  onSelect: ({ token }: { token: PToken }) => void;
  showNetwork: boolean;
}

const Styled = styled.div`
  margin-top: 12px;
`;

const Item = styled(Row)`
  padding: 12px 0 12px 12px;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.bg4};
    .network {
      background-color: ${({ theme }) => theme.bg1};
    }
  }

  .logo {
    width: 24px;
    height: 24px;
  }

  .checkIcon {
    width: 16px;
    height: 16px;
  }

  .network {
    color: ${({ theme }) => theme.bg4};
    padding-left: 4px;
    padding-right: 4px;
    margin-left: 6px;
    background-color: ${({ theme }) => theme.bg4};
    border-radius: 4px;
  }
  .extra-info {
    margin-top: 2px;
    display: flex;
    align-items: center;
  }

  .space {
    width: 10px;
  }

  .followedWrapper {
    padding: 5px;
    border-radius: 5px;
    margin-right: 8px;
    background-color: ${({ theme }) => theme.bg4};
  }
`;

interface IProps {
  tokens: PToken[];
  showNetwork: boolean;
  blacklist: string[];
}

let isAddToken = false;
const VerifyIcon = () => <img alt="token-logo" className="checkIcon" src={CheckIconSrc} />;

const AddTokenModal = React.memo((props: IProps & any) => {
  const { closeModal } = useModal();
  const { tokens, showNetwork, blacklist = [] } = props;
  const [isShowCoinsInfo, setShowCoinsInfo] = useState(false);
  const _tokens = React.useMemo(() => {
    return tokens.filter((token: PToken) => !blacklist.some((id: string) => id === token.identify));
  }, [tokens, blacklist]);
  const dispatch = useDispatch();
  const getPrivacyDataByTokenIDFn = useSelector(getPrivacyDataByTokenIDSelector);
  const followedTokenIDList: any[] = useSelector(incognitoAccountFollowTokenIDs) as any[];

  let tokenList: any[] = [];
  const [tokenListSearch = [], onSearchTokens] = useFuse(_tokens, {
    keys: ['displayName', 'name', 'symbol', 'pSymbol'],
    matchAllOnEmptyQuery: true,
    isCaseSensitive: false,
    findAllMatches: true,
    includeMatches: false,
    includeScore: true,
    useExtendedSearch: false,
    threshold: 0,
    location: 0,
    distance: 2,
    maxPatternLength: 32,
  });

  tokenList =
    (tokenListSearch as any[]).filter((token: any) => {
      if (token.tokenID === PRV.id && token.currencyType !== 0) return false;
      return true;
    }) || [];
  tokenList = orderBy(tokenList, ['isPRV', 'isVerified', 'isUnified'], ['desc', 'desc', 'desc']);

  const importTokenSuccess = () => {
    closeModal();
  };
  const keySearchChange = (key: string) => {
    if (typeof onSearchTokens === 'function') {
      onSearchTokens(key);
    }
  };

  const renderItem = (props: any) => {
    const { style, index } = props;
    if (typeof index !== 'number') return null;
    const token = tokenList[index];
    const isFollowed = followedTokenIDList.some((tokenID) => tokenID === token.tokenID);
    if (!token) return null;
    return (
      <Item
        key={token.identify}
        style={style}
        onClick={() => {
          // closeModal();
          isAddToken = !isFollowed;
          const tokenSelectedPrivacy = getPrivacyDataByTokenIDFn(token.tokenID);
          dispatch(setFollowTokenSelectedByToken(tokenSelectedPrivacy));
          setShowCoinsInfo(true);
          // onSelect({ token });
        }}
      >
        <Row style={{ flex: 1, alignItems: 'center' }}>
          <Image iconUrl={token.iconUrl} size={showNetwork ? 40 : 32} />
          <Column style={{ marginLeft: 12 }}>
            <Row style={{ flex: 1, alignItems: 'center' }}>
              <Typography.Text type="p1" fontWeight={600}>
                {token.symbol}
              </Typography.Text>
              <div className="space"></div>
              {token.isVerified && <VerifyIcon />}
            </Row>
            {showNetwork && (
              <div className="extra-info">
                <Typography.Text type="p2" fontWeight={500} color="gray_9C9C9C">
                  {token.shortName}
                </Typography.Text>
                <div className="network">
                  <Typography.Text type="p2" fontWeight={500} color="gray_9C9C9C">
                    {token.network}
                  </Typography.Text>
                </div>
              </div>
            )}
          </Column>
          {isFollowed && (
            <Row style={{ flex: 1, justifyContent: 'flex-end' }}>
              <ThemedText.Small className="followedWrapper" color="primary5">
                {'Followed'}
              </ThemedText.Small>
            </Row>
          )}
        </Row>
      </Item>
    );
  };

  return (
    <div className="animation-opacity">
      <SearchTokenBar keySearchChange={keySearchChange} />
      <Styled>
        <List
          overscanCount={6}
          height={500}
          itemCount={tokenList.length}
          itemData={tokenList}
          itemSize={69}
          width="100%"
        >
          {renderItem}
        </List>

        {/* Modal  */}
        {isShowCoinsInfo && (
          <CoinsInfoModal
            isModalOpen={isShowCoinsInfo}
            onCloseModal={() => setShowCoinsInfo(false)}
            isAddToken={isAddToken}
            onSuccess={importTokenSuccess}
          />
        )}
      </Styled>
    </div>
  );
});

AddTokenModal.displayName = 'AddTokenModal';

export default AddTokenModal;
