import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Space } from 'components/Core';
import { ButtonConfirmed } from 'components/Core/Button';
import { Image } from 'components/Core/Image';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import Row, { RowBetween } from 'components/Core/Row';
import { NetworkModal, useModal } from 'components/Modal';
import { SITE_KEY } from 'config';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE, ROOT_NETWORK_IMG } from 'constants/token';
import { ITokenNetwork } from 'models/model/pTokenModel';
import React from 'react';
import { ChevronDown } from 'react-feather';
import { Field } from 'redux-form';
import { submitDepositTx } from 'services/rpcClient';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import rpcMetric, { METRIC_TYPE } from '../../../../services/rpcMetric';
import { FORM_CONFIGS } from './SubmitTxDeposit.constant';
import enhance from './SubmitTxDeposit.enhance';

export const BottomView = styled.div`
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
  {
    identify: MAIN_NETWORK_NAME.AVALANCHE,
    networkName: MAIN_NETWORK_NAME.AVALANCHE,
    currency: PRIVATE_TOKEN_CURRENCY_TYPE.AVAX,
  },
  {
    identify: MAIN_NETWORK_NAME.AURORA,
    networkName: MAIN_NETWORK_NAME.AURORA,
    currency: PRIVATE_TOKEN_CURRENCY_TYPE.AURORA_ETH,
  },
  {
    identify: MAIN_NETWORK_NAME.NEAR,
    networkName: MAIN_NETWORK_NAME.NEAR,
    currency: PRIVATE_TOKEN_CURRENCY_TYPE.NEAR,
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
  const [{ isLoading, isSuccess, error }, setState] = React.useState({ isLoading: false, isSuccess: false, error: '' });
  const [{ captchaToken }, setCaptcha] = React.useState({ captchaToken: '' });
  const [network] = React.useState(dataObj);
  const captchaRef = React.useRef<any>(null);
  const updateMetric = () => rpcMetric.updateMetric({ type: METRIC_TYPE.RESUBMIT_DEPOSIT });
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
      setState({ isLoading: true, isSuccess: false, error: '' });
      updateMetric().then();
      await submitDepositTx({
        hash: inputTxHash,
        networkID: network.networkID,
        captcha: captchaToken,
      });
      setState({ isLoading: false, isSuccess: true, error: '' });
    } catch (error) {
      setState({ isLoading: false, isSuccess: false, error: error && error.message ? error.message : error });
    } finally {
      resetCaptcha();
      setCaptcha({ captchaToken: '' });
    }
  };

  const verifyCallback = (token: string) => {
    if (!token) return;
    setCaptcha({ captchaToken: token });
  };

  const resetCaptcha = () => {
    if (!captchaRef || !captchaRef.current || !captchaRef.current.resetCaptcha) return;
    captchaRef.current.resetCaptcha();
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitTxHash)}>
      <Space.Vertical size={16} />
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
      <Space.Vertical size={16} />
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
      <Space.Vertical size={16} />
      <div
        style={{
          paddingTop: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <HCaptcha sitekey={SITE_KEY} onVerify={verifyCallback} ref={captchaRef} />
      </div>
      <BottomView>
        <ThemedText.Error marginBottom="4px" error className={`error`}>
          {error}
        </ThemedText.Error>
        <ButtonConfirmed disabled={!captchaToken} type="submit">
          {isSuccess ? 'Successfully' : isLoading ? 'Submitting...' : 'Submit'}
        </ButtonConfirmed>
      </BottomView>
    </form>
  );
});

SubmitTxDeposit.displayName = 'SubmitTxDeposit';

export default enhance(SubmitTxDeposit);
