import { Typography } from 'components/Core';
import styled from 'styled-components/macro';
const Container = styled.div`
  margin-top: 10px;
  display: flex;
`;

type ErrorViewProps = {
  message?: string;
};

const ErrorView = (props: ErrorViewProps) => {
  const { message } = props;
  return (
    <Container>
      <Typography.Text type="p2" color="red_F6465D" fontWeight={600} textAlign="left">
        {message}
      </Typography.Text>
    </Container>
  );
};

export default ErrorView;
