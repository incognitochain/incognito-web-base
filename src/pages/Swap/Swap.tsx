import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { RouteComponentProps } from 'react-router-dom';
import { useDefaultsFromURLSearch } from 'state/swap/hooks';

export default function Swap({ history }: RouteComponentProps) {
  const { account, chainId } = useActiveWeb3React();
  const loadedUrlParams = useDefaultsFromURLSearch();
  console.log(loadedUrlParams);
  return <div>SANg</div>;
}
