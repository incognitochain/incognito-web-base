import ListProposal from './components/ListProposal';
import TopView from './components/TopView';

const Governance = () => {
  return (
    <div className="default-max-width-2" style={{ width: '100%', paddingBottom: 40 }}>
      <TopView />
      <ListProposal />
    </div>
  );
};
export default Governance;
