import { TAB_LIST, Tabs } from 'components/Core/Tabs';
import AppBody from 'pages/AppBody';

import { FormSwap } from './features/Form';
import enhance from './Swap.enhance';

const Swap = (props: any) => {
  // const { account, chainId } = useActiveWeb3React();
  return (
    <>
      <AppBody>
        <Tabs {...TAB_LIST.SWAP} />
        <FormSwap {...props} />
      </AppBody>
    </>
  );
};

export default enhance(Swap);
