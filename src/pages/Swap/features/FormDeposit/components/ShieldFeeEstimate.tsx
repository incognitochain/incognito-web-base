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
          10 mins
        </ThemedText.SmallLabel>
      </Row>
    </Styled>
  );
};

export default ShieldFeeEstimate;
