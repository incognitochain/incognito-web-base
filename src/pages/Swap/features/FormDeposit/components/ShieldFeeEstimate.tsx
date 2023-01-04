import Row from 'components/Core/Row';
import { MAIN_NETWORK_NAME } from 'constants/token';
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
  sellNetworkName: MAIN_NETWORK_NAME | string;
}

const ShieldFeeEstimate = (props: ShieldFeeEstimateProps) => {
  const { value = '0.0005 ETH' || '', sellNetworkName } = props;
  const getEstimateTime = () => {
    let time = 0;
    let desc = '';
    switch (sellNetworkName) {
      case MAIN_NETWORK_NAME.ETHEREUM:
        time = 7;
        break;
      case MAIN_NETWORK_NAME.BSC:
        time = 4;
        break;
      case MAIN_NETWORK_NAME.POLYGON:
        time = 8;
        break;
      case MAIN_NETWORK_NAME.FANTOM:
      case MAIN_NETWORK_NAME.AVALANCHE:
      case MAIN_NETWORK_NAME.AURORA:
      case MAIN_NETWORK_NAME.NEAR:
        time = 3;
        break;
      case MAIN_NETWORK_NAME.BTC:
        time = 60;
        break;
      default:
        time = 6;
    }
    return time + ' mins';
  };
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
        </>
      )}

      <Row className="topView" style={{ marginTop: 8 }}>
        <Row style={{ flex: 1 }}>
          <ThemedText.SmallLabel fontWeight={400} color="primary8" lineHeight={'14px'} style={{ alignItems: 'center' }}>
            Estimate time
          </ThemedText.SmallLabel>
        </Row>

        <ThemedText.SmallLabel fontWeight={400} color="primary5">
          {getEstimateTime()}
        </ThemedText.SmallLabel>
      </Row>
    </Styled>
  );
};

export default ShieldFeeEstimate;
