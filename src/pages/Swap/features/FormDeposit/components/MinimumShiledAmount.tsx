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
interface MinimumShiledAmountProps {
  value?: string | number;
}

const MinimumShiledAmount = (props: MinimumShiledAmountProps) => {
  const { value = '0.00001 ETH' || '' } = props;
  return (
    <Styled>
      <Row className="topView">
        <ThemedText.SmallLabel fontWeight={400} color="primary8">
          {'Minimum shield amount'}
        </ThemedText.SmallLabel>

        <ThemedText.SmallLabel fontWeight={400} color="primary5">
          {value}
        </ThemedText.SmallLabel>
      </Row>
      <Row className="bottomView">
        <ThemedText.Small fontWeight={400} color="primary15">
          {'Smaller amounts will be rejected by the network and lost.'}
        </ThemedText.Small>
      </Row>
    </Styled>
  );
};

export default MinimumShiledAmount;
