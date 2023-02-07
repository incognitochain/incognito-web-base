import { InfoStyled } from './Collections.styled';

const PnftInfo = () => {
  return (
    <InfoStyled>
      <div className="titleView">
        <div className="title-container">
          <h3 className="title-custom">What is pNFT?</h3>
        </div>
        <div className="title-container">
          <p className="h8 description-custom">
            pNFT is a DApp that allows you to purchase NFTs and crypto collectibles on the largest web3 marketplace -
            with full privacy on Incognito.
          </p>
        </div>
      </div>
    </InfoStyled>
  );
};

export default PnftInfo;
