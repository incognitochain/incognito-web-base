import ListProposal from './components/ListProposal';
import TopView from './components/TopView';
import TreasuryBox from './components/TreasuryBox';

const Governance = () => {
  return (
    <div className="default-max-width-2" style={{ width: '100%', paddingBottom: 40 }}>
      <TopView />
      <TreasuryBox />
      <ListProposal />
    </div>
  );
};
export default Governance;
