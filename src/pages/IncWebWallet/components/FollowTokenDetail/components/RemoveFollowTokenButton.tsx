import BinIconSrc from 'assets/svg/ic-bin.svg';
import { throttle } from 'lodash';
import { useCallback, useState } from 'react';
type ReloadBalanceButtonProps = {
  onClickCallback?: () => void;
};

const RemoveFollowTokenButton = (props: ReloadBalanceButtonProps): any => {
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
    <div key="bin-ic-key" className="hover-opacity center" onClick={onClick}>
      <img alt="ic-bin" src={BinIconSrc} />
    </div>
  );
};

export default RemoveFollowTokenButton;
