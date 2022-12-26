/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import icClock from 'assets/svg/ic-clock.svg';
import { useModal } from 'components/Modal';
import ModalTokens from 'components/Modal/Modal.tokens';
import { Convert, POpenseaBuyFee, POpenseaNft } from 'models/model/POpenseaNFT';
import PToken from 'models/model/pTokenModel';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { postEstimateFee } from 'services/rpcPOpensea';
import { unshieldableTokens } from 'state/token';

import { ArrowDown, TextInputStyled } from '../POpenseaNFTDetail.styled';

interface POpenseaNFTDetailBuyProps {
  selectedNFT: POpenseaNft;
}
const POpenseaNFTDetailBuy = (props: POpenseaNFTDetailBuyProps) => {
  const { selectedNFT } = props;
  const tokens = useSelector(unshieldableTokens).filter((token) => token.isMainETH);

  const seaportSellOrder =
    selectedNFT.seaportSellOrders && selectedNFT.seaportSellOrders.length > 0
      ? selectedNFT.seaportSellOrders[0]
      : undefined;
  const assetContract = selectedNFT.assetContract;

  const { setModal } = useModal();

  const [reciptientAddress, setReciptientAddress] = useState('');
  const [selectedToken, setSelectedToken] = useState<PToken | undefined>();
  const [buyFee, setBuyFee] = useState<POpenseaBuyFee | undefined>();

  useEffect(() => {
    tokens.length > 0 && selectedToken === undefined && setSelectedToken(tokens[0]);
  }, [tokens]);

  useEffect(() => {
    if (reciptientAddress && selectedToken) {
      estimateFee();
    }
  }, [selectedToken, reciptientAddress]);

  const estimateFee = async () => {
    const tokenId = selectedNFT.tokenId;
    if (
      reciptientAddress &&
      selectedToken &&
      selectedNFT &&
      tokenId &&
      assetContract &&
      assetContract.address &&
      seaportSellOrder
    ) {
      const contract = assetContract.address;
      try {
        const res = await postEstimateFee(
          contract,
          tokenId,
          selectedToken.tokenID,
          seaportSellOrder.currentPrice,
          reciptientAddress
        );
        if (res && res.Calldata) {
          const fee = Convert.toPOpenseaBuyFee(res);
          setBuyFee(fee);
        }
      } catch (error) {}
    }
  };

  const onClickBuy = () => {
    console.log('NFT: ', selectedNFT);
  };

  const onSelectToken = ({ token }: { token: PToken }) => {
    setSelectedToken(token);
  };

  const showTokensList = () => {
    setModal({
      closable: true,
      data: <ModalTokens tokens={tokens} onSelect={onSelectToken} showNetwork={true} />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Select a Token',
      isSearchTokenModal: true,
    });
  };

  const onChangeReciptientAddress = (e: any) => {
    setReciptientAddress(e.target.value);
  };

  const renderSelectTokenList = () => (
    <div className="select-tokens-list" onClick={showTokensList}>
      {selectedToken && <img className="selected-token-icon" src={selectedToken.iconUrl} />}
      {selectedToken && <p>{selectedToken.symbol}</p>}
      <ArrowDown />
    </div>
  );

  return (
    <div className="price-container">
      <div className="view-content">
        <img src={icClock} />
        <p className="time-sale">{`Sale ends ${seaportSellOrder ? seaportSellOrder.closingDate : ''}`}</p>
      </div>
      <div className="price-indicator" />
      <div className="buy-container">
        <TextInputStyled
          placeholder={'Reciptient Address'}
          type={'text'}
          onChange={onChangeReciptientAddress}
          value={reciptientAddress}
          autoFocus={false}
        />
        {renderSelectTokenList()}
      </div>
      <div className="price-indicator" />
      <div className="buy-container">
        <div className="price-view">
          <p className="current-price">Current price</p>
          {seaportSellOrder && (
            <div className="price">
              <p className="price-coin">{parseInt(seaportSellOrder.currentPrice) / 10e18} ETH</p>
              {/* <p className="price-usd">$...</p> */}
            </div>
          )}
        </div>
        <button className="btn-buy" onClick={onClickBuy}>
          <p className="text-buy">Buy</p>
        </button>
      </div>
    </div>
  );
};

export default memo(POpenseaNFTDetailBuy);
