import { ButtonConfirmed } from 'components/Core/Button';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import { RowBetween } from 'components/Core/Row';
import { VerticalSpace } from 'components/Core/Space';
import { NetworkModal, useModal } from 'components/Modal';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE } from 'constants/token';
import { ITokenNetwork } from 'models/model/pTokenModel';
import React from 'react';
import { Field } from 'redux-form';
import { rpcClient } from 'services';
import styled from 'styled-components/macro';

import { DEFAULT_NETWORK } from '../SubmitTxDeposit/SubmitTxDeposit';
import { FORM_CONFIGS } from './SubmitTxUnshield.constant';
import enhance from './SubmitTxUnshield.enhance';

export const NetworkSelector = styled(RowBetween)`
  background: #252525;
  border-radius: 8px;
  height: 56px;
  padding: 0 16px 0 16px;
  cursor: pointer;
`;

export const getNetworkByCurrency = ({ currency }: { currency: number }): any => {
  let networkName = undefined;
  let networkID = undefined;
  switch (currency) {
    case PRIVATE_TOKEN_CURRENCY_TYPE.ETH:
    case PRIVATE_TOKEN_CURRENCY_TYPE.ERC20:
      networkName = 'eth';
      networkID = 1;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB:
    case PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BEP20:
      networkName = 'bsc';
      networkID = 2;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.MATIC:
    case PRIVATE_TOKEN_CURRENCY_TYPE.POLYGON_ERC20:
      networkName = 'plg';
      networkID = 3;
      break;
    case PRIVATE_TOKEN_CURRENCY_TYPE.FTM:
    case PRIVATE_TOKEN_CURRENCY_TYPE.FANTOM_ERC20:
      networkName = 'ftm';
      networkID = 4;
      break;
  }
  return { networkName, networkID };
};

export const ButtonSubmit = styled(ButtonConfirmed)`
  position: absolute;
  bottom: 20px;
  right: 24px;
  left: 24px;
  width: auto;
`;

let dataObj = {
  currency: PRIVATE_TOKEN_CURRENCY_TYPE.ETH,
  name: MAIN_NETWORK_NAME.ETHEREUM,
  network: getNetworkByCurrency({ currency: PRIVATE_TOKEN_CURRENCY_TYPE.ETH }).networkName,
};

const SubmitTxUnshield = React.memo((props: any) => {
  const { handleSubmit, validateAddress, validateTxhash, inputAddress, inputHash } = props;
  const { setModal } = useModal();
  const [{ isLoading, isSuccess }, setState] = React.useState({ isLoading: false, isSuccess: false });
  const [network] = React.useState(dataObj);

  const handleSelectNetwork = React.useCallback(
    ({ network: _network }: { network: ITokenNetwork }) => {
      dataObj = {
        currency: _network.currency,
        name: _network.networkName,
        network: getNetworkByCurrency({ currency: _network.currency }).networkName,
      };
    },
    [network]
  );

  const showNetworkList = () => {
    setModal({
      closable: true,
      data: <NetworkModal networks={DEFAULT_NETWORK} onSelect={handleSelectNetwork} />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Select network',
    });
  };

  const handleSubmitTxHash = async () => {
    try {
      setState({ isLoading: true, isSuccess: false });
      console.log('SANG', {
        paymentAddr: inputAddress,
        txID: inputHash,
        network: network.network,
      });
      await rpcClient.submitUnshieldTx({
        paymentAddr: inputAddress,
        txID: inputHash,
      });
      setState({ isLoading: false, isSuccess: true });
    } catch (error) {
      setState({ isLoading: false, isSuccess: false });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleSubmitTxHash)}>
      <VerticalSpace />
      <Field
        component={InputField}
        name={FORM_CONFIGS.txHash}
        inputType={INPUT_FIELD.string}
        leftTitle="TxID"
        componentProps={{
          placeholder: 'Enter Burn TxID',
        }}
        validate={validateTxhash}
      />
      <VerticalSpace />
      <Field
        component={InputField}
        name={FORM_CONFIGS.address}
        inputType={INPUT_FIELD.string}
        leftTitle="Incognito Address"
        componentProps={{
          placeholder: 'Enter Your Incognito Address',
        }}
        validate={validateAddress}
      />
      {/*<VerticalSpace />*/}
      {/*<ThemedText.SmallLabel fontWeight={400} marginBottom="4px" color="primary8">*/}
      {/*  Network*/}
      {/*</ThemedText.SmallLabel>*/}
      {/*<NetworkSelector className="border-hover" onClick={showNetworkList}>*/}
      {/*  <Row>*/}
      {/*    {!!network.currency && <Image iconUrl={ROOT_NETWORK_IMG[network.currency]} />}*/}
      {/*    <ThemedText.RegularLabel color="primary5" style={{ marginLeft: '7px' }}>*/}
      {/*      {network.name}*/}
      {/*    </ThemedText.RegularLabel>*/}
      {/*  </Row>*/}
      {/*  <ChevronDown size={24} />*/}
      {/*</NetworkSelector>*/}
      <VerticalSpace />
      <ButtonSubmit type="submit">{isSuccess ? 'Successfully' : isLoading ? 'Submitting...' : 'Submit'}</ButtonSubmit>
    </form>
  );
});

SubmitTxUnshield.displayName = 'SubmitTxUnshield';

export default enhance(SubmitTxUnshield);
