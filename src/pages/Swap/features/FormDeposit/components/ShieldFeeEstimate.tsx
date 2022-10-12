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
    flex-direction: row;
  }
`;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ShieldFeeEstimateProps {
  value?: string | number;
}

const ShieldFeeEstimate = (props: ShieldFeeEstimateProps) => {
  const { value = '0.0005 ETH' || '' } = props;
  return (
    <Styled>
      <Row className="topView">
        <ThemedText.SmallLabel fontWeight={400} color="primary8">
          {'Shielding fee (est.)'}
        </ThemedText.SmallLabel>

        <ThemedText.SmallLabel fontWeight={400} color="primary5">
          {value}
        </ThemedText.SmallLabel>
      </Row>
      <Row className="Small">
        <ThemedText.Small fontWeight={400} color="primary15">
          {'This fee will be deducted from the shielded funds.'}
        </ThemedText.Small>
      </Row>
      <div style={{ height: 10 }}></div>
      <Row className="topView">
        <ThemedText.SmallLabel fontWeight={400} color="primary8">
          {'Estimation time:'}
        </ThemedText.SmallLabel>
        <ThemedText.SmallLabel fontWeight={400} color="primary5">
          10 mins
        </ThemedText.SmallLabel>
      </Row>
    </Styled>
  );
};

export default ShieldFeeEstimate;
