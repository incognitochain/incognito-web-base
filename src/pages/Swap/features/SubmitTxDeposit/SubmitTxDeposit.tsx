import { Image } from 'components/Core/Image';
import { InputField } from 'components/Core/ReduxForm';
import { INPUT_FIELD } from 'components/Core/ReduxForm/InputField';
import Row, { RowBetween } from 'components/Core/Row';
import { VerticalSpace } from 'components/Core/Space';
import { NetworkModal } from 'components/Modal';
import { useModal } from 'components/Modal';
import { MAIN_NETWORK_NAME, PRIVATE_TOKEN_CURRENCY_TYPE, ROOT_NETWORK_IMG } from 'constants/token';
import { ITokenNetwork } from 'models/model/pTokenModel';
import { ButtonSubmit } from 'pages/Swap/features/SubmitTxUnshield/SubmitTxUnshield';
import React, { useState } from 'react';
import { ChevronDown } from 'react-feather';
import { Field } from 'redux-form';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

import { FORM_CONFIGS } from './SubmitTxDeposit.constant';
import enhance from './SubmitTxDeposit.enhance';

const NetworkSelector = styled(RowBetween)`
  background: #252525;
  border: 1px solid #363636;
  border-radius: 8px;
  height: 56px;
  padding: 0 16px 0 16px;
  cursor: pointer;
`;

const SubmitTxDeposit = React.memo((props: any) => {
  const { handleSubmit } = props;
  const [network, setSelectNetwork] = useState<any>({
    currency: undefined,
    name: 'Unknown',
    network: '',
  });

  console.log('SANG', network);

  const { setModal } = useModal();

  const handleSelectNetwork = React.useCallback(
    ({ network: _network }: { network: ITokenNetwork }) => {
      console.log('SANG 2222', _network);
      setSelectNetwork({
        currency: _network.currency,
        name: _network.networkName,
        network: '',
      });
    },
    [network]
  );

  const showNetworkList = () => {
    const networks: ITokenNetwork[] = [
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
    setModal({
      closable: true,
      data: <NetworkModal networks={networks} onSelect={handleSelectNetwork} />,
      isTransparent: false,
      rightHeader: undefined,
      title: 'Select network',
    });
  };

  return (
    <form onSubmit={handleSubmit(() => console.log('SNAG'))}>
      <VerticalSpace />
      <Field
        component={InputField}
        name={FORM_CONFIGS.formName}
        inputType={INPUT_FIELD.string}
        leftTitle="TxID"
        componentProps={{
          placeholder: 'Enter Your External TxID',
        }}
      />
      <VerticalSpace />
      <NetworkSelector onClick={showNetworkList}>
        <Row>
          {!!network.currency && <Image iconUrl={ROOT_NETWORK_IMG[network.currency]} />}
          <ThemedText.RegularLabel color="primary7">{network.name}</ThemedText.RegularLabel>
        </Row>
        <ChevronDown size={24} />
      </NetworkSelector>
      <VerticalSpace />
      <ButtonSubmit type="submit">Submit</ButtonSubmit>
    </form>
  );
});

SubmitTxDeposit.displayName = 'SubmitTxDeposit';

export default enhance(SubmitTxDeposit);
