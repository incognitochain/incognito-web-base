import ListProposal from './components/ListProposal';
import TopView from './components/TopView';
import TreasuryBox from './components/TreasuryBox';

const Governance = () => {
  return (
    <div className="default-padding-horizontal" style={{ width: '100%' }}>
      <TopView />
      <TreasuryBox />
      <ListProposal />
    </div>
  );
};
export default Governance;