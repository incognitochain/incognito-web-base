import { ReactComponent as Info } from 'assets/images/info.svg';
import Row from 'components/Core/Row';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';

const Styled = styled.div`
  margin-top: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;

  .topView {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .label {
      // TO DO
    }
    .value {
      // TO DO
    }
  }
  .bottomView {
    display: flex;
    flex-direction: column;
    width: calc(100% + 48px);
    margin-left: -24px;
    margin-bottom: -24px;
    background-color: #404040;
    padding: 24px;
  }
`;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ShieldFeeEstimateProps {
  value?: string | number;
  symbol?: string;
}

const ShieldFeeEstimate = (props: ShieldFeeEstimateProps) => {
  const { value = '0.0005 ETH' || '', symbol } = props;
  return (
    <Styled>
      {value && (
        <>
          <Row className="topView">
            <Row style={{ flex: 1 }}>
              <ThemedText.SmallLabel
                fontWeight={400}
                color="primary8"
                lineHeight={'14px'}
                style={{ alignItems: 'center' }}
              >
                {'Shielding fee (est.)'}
              </ThemedText.SmallLabel>
              <Info width="14" height="14" />
            </Row>

            <ThemedText.SmallLabel fontWeight={400} color="primary5">
              {value}
            </ThemedText.SmallLabel>
          </Row>
          <Row className="Small">
            <ThemedText.Small fontWeight={400} color="primary15">
              {'This fee will be deducted from the shielded funds.'}
            </ThemedText.Small>
          </Row>
          <div style={{ height: 24 }} />
        </>
      )}
      <Row className="bottomView">
        <Row>
          <ThemedText.SmallLabel fontWeight={400} color="primary8">
            * Your {symbol} shielding transaction is estimated to complete in 10 mins.
          </ThemedText.SmallLabel>
        </Row>
        <div style={{ height: 8 }} />
        <Row>
          <ThemedText.SmallLabel fontWeight={400} color="primary8">
            * Sending coins or tokens other than {symbol} to this address may result in the loss of your funds.
          </ThemedText.SmallLabel>
        </Row>
      </Row>
    </Styled>
  );
};

export default ShieldFeeEstimate;
