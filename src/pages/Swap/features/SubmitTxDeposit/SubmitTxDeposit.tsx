import { ButtonConfirmed } from 'components/Core/Button';
import { Image } from 'components/Core/Image';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import Row, { RowBetween } from 'components/Core/Row';
import { VerticalSpace } from 'components/Core/Space';
import { NetworkModal, useModal } from 'components/Modal';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE, ROOT_NETWORK_IMG } from 'constants/token';
import { ITokenNetwork } from 'models/model/pTokenModel';
import React from 'react';
import { ChevronDown } from 'react-feather';
import { Field } from 'redux-form';
import { submitDepositTx } from 'services/rpcClient';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import { FORM_CONFIGS } from './SubmitTxDeposit.constant';
import enhance from './SubmitTxDeposit.enhance';

export const ButtonSubmit = styled(ButtonConfirmed)`
  margin-top: 60px;
`;

const NetworkSelector = styled(RowBetween)`
  background: #252525;
  border-radius: 8px;
  height: 56px;
  padding: 0 16px 0 16px;
  cursor: pointer;
`;

const getNetworkByCurrency = ({ currency }: { currency: number }): any => {
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

export const DEFAULT_NETWORK: ITokenNetwork[] = [
  {
    identify: MAIN_NETWORK_NAME.ETHEREUM,
    networkName: MAIN_NETWORK_NAME.ETHEREUM,
    currency: PRIVATE_TOKEN_CURRENCY_TYPE.ETH,
  },
  {
    identify: MAIN_NETWORK_NAME.BSC,
    networkName: MAIN_NETWORK_NAME.BSC,
    currency: PRIVATE_TOKEN_CURRENCY_TYPE.BSC_BNB,
  },
  {
    identify: MAIN_NETWORK_NAME.POLYGON,
    networkName: MAIN_NETWORK_NAME.POLYGON,
    currency: PRIVATE_TOKEN_CURRENCY_TYPE.MATIC,
  },
  {
    identify: MAIN_NETWORK_NAME.FANTOM,
    networkName: MAIN_NETWORK_NAME.FANTOM,
    currency: PRIVATE_TOKEN_CURRENCY_TYPE.FTM,
  },
];

let dataObj = {
  currency: PRIVATE_TOKEN_CURRENCY_TYPE.ETH,
  name: MAIN_NETWORK_NAME.ETHEREUM,
  networkID: getNetworkByCurrency({ currency: PRIVATE_TOKEN_CURRENCY_TYPE.ETH }).networkID,
};

const SubmitTxDeposit = React.memo((props: any) => {
  const { handleSubmit, validateTxhash, inputTxHash } = props;
  const { setModal } = useModal();
  const [{ isLoading, isSuccess }, setState] = React.useState({ isLoading: false, isSuccess: false });
  const [network] = React.useState(dataObj);

  const handleSelectNetwork = React.useCallback(
    ({ network: _network }: { network: ITokenNetwork }) => {
      dataObj = {
        currency: _network.currency,
        name: _network.networkName,
        networkID: getNetworkByCurrency({ currency: _network.currency }).networkID,
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
      await submitDepositTx({
        hash: inputTxHash,
        networkID: network.networkID,
      });
      setState({ isLoading: false, isSuccess: true });
    } catch (error) {
      setState({ isLoading: false, isSuccess: false });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitTxHash)}>
      <VerticalSpace />
      <Field
        component={InputField}
        name={FORM_CONFIGS.txHash}
        inputType={INPUT_FIELD.string}
        leftTitle="TxID"
        componentProps={{
          placeholder: 'Enter Your External TxID',
        }}
        validate={validateTxhash}
      />
      <VerticalSpace />
      <ThemedText.SmallLabel fontWeight={400} marginBottom="4px" color="primary8">
        Network
      </ThemedText.SmallLabel>
      <NetworkSelector className="border-hover" onClick={showNetworkList}>
        <Row>
          {!!network.currency && <Image iconUrl={ROOT_NETWORK_IMG[network.currency]} />}
          <ThemedText.RegularLabel color="primary5" style={{ marginLeft: '7px' }}>
            {network.name}
          </ThemedText.RegularLabel>
        </Row>
        <ChevronDown size={24} />
      </NetworkSelector>
      <VerticalSpace />
      <ButtonSubmit type="submit">{isSuccess ? 'Successfully' : isLoading ? 'Submitting...' : 'Submit'}</ButtonSubmit>
    </form>
  );
});

SubmitTxDeposit.displayName = 'SubmitTxDeposit';

export default enhance(SubmitTxDeposit);
