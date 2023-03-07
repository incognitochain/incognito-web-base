import { useSelector } from 'react-redux';
import { webWalletStateSelector } from 'state/masterKey';

import ListMasterKey from './ListMasterKey';
import ListMasterLess from './ListMasterLess';

const KeyChain = () => {
  const webWalletState = useSelector(webWalletStateSelector);

  return (
    <div className="default-max-width" style={{ width: '100%', paddingBottom: 40 }}>
      <div style={{ flex: 1 }}>
        <ListMasterKey />
        <ListMasterLess />
      </div>
    </div>
  );
};
export default KeyChain;
