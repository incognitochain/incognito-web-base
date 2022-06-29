import { TAB_LIST, Tabs } from 'components/Core/Tabs';
import AppBody from 'pages/AppBody';
import { RouteComponentProps } from 'react-router-dom';

export default function Swap({ history }: RouteComponentProps) {
  // const { account, chainId } = useActiveWeb3React();
  return (
    <>
      <AppBody>
        <Tabs {...TAB_LIST.SWAP} />
      </AppBody>
    </>
  );
}
