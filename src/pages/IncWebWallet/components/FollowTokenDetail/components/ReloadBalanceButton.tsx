import ReloadIconSrc from 'assets/svg/ic-reload.svg';
import { throttle } from 'lodash';
import { useCallback, useState } from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  @keyframes spin {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;

type ReloadBalanceButtonProps = {
  onClickCallback?: () => void;
};

const ReloadBalanceButton = (props: ReloadBalanceButtonProps): any => {
  const { onClickCallback } = props;
  const [animating, setAnimating] = useState(false);
  const onClick = useCallback(
    throttle(
      () => {
        setAnimating(true);
        onClickCallback && onClickCallback();
        setTimeout(() => setAnimating(false), 1000);
      },
      1000,
      {
        leading: true,
        trailing: false,
      }
    ),
    []
  );
  return (
    <Container>
      <div
        key="remove-ic-key"
        className="hover-opacity center"
        style={{ animation: animating ? 'spin 1s linear infinite' : '' }}
        onClick={onClick}
      >
        <img alt="ic-reload1" src={ReloadIconSrc} />
      </div>
    </Container>
  );
};

export default ReloadBalanceButton;
