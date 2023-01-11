import { Col, Row } from 'antd';
import { InputField } from 'components/Core/ReduxForm';
import { PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import { ArrowDown } from 'pages/POpenseaNFTDetail/components/POpenseaNFTDetail.buy.styled';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { unshieldableTokens } from 'state/token';

import { useModal } from '../../../../components/Modal';
import ModalTokens from '../../../../components/Modal/Modal.tokens';
import SelectedPrivacy from '../../../../models/model/SelectedPrivacyModel';
import { FORM_CONFIGS } from './CollectionDetail.constant';
import enhance from './CollectionDetail.enhanceFooter';
import { Container } from './CollectionDetail.footer.styled';

const Address = () => {
  return (
    <Col>
      <Row>
        <Field
          component={InputField}
          name={FORM_CONFIGS.address}
          inputType={FORM_CONFIGS.address}
          componentProps={{
            placeholder: 'Recipient Address',
          }}
          // validate={validateAddress}
        />
      </Row>
      <p className="note">
        (*) this is an Ethereum address that the buying NFT will be sent to, we recommend using a fresh address here to
        maximize your anonymity.
      </p>
    </Col>
  );
};

const SelectToken = memo(({ tokens, selectedToken }: { tokens: SelectedPrivacy[]; selectedToken: SelectedPrivacy }) => {
  const { setModal } = useModal();
  const showTokensList = () => {
    setModal({
      closable: true,
      data: <ModalTokens tokens={tokens} onSelect={() => {}} showNetwork={true} />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Select a Token',
      isSearchTokenModal: true,
    });
  };

  return (
    <div className="select-tokens-list" onClick={showTokensList}>
      {selectedToken && <img className="selected-token-icon" src={selectedToken.iconUrl} />}
      {selectedToken && <p>{selectedToken.symbol}</p>}
      <ArrowDown />
    </div>
  );
});

const StickyFooter = () => {
  const tokens = useSelector(unshieldableTokens).filter(
    (token) => token.isMainETH || token.currencyType === PRIVATE_TOKEN_CURRENCY_TYPE.ETH
  );
  return (
    <Container>
      <form className="default-max-width form">
        <Row>
          <Address />
          <SelectToken tokens={tokens} selectedToken={tokens[0]} />
        </Row>
      </form>
    </Container>
  );
};

export default compose(
  reduxForm({
    form: FORM_CONFIGS.formName,
    destroyOnUnmount: false,
  }),
  enhance
)(memo(StickyFooter)) as any;
