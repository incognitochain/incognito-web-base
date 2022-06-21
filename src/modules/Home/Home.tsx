import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = React.memo(() => {
  const history = useHistory();

  return (
    <div
      style={{ width: 100, height: 200, backgroundColor: 'blue' }}
      onClick={() => history.push('/example')}
    />
  );
});

export default Home;
