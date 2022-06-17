import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = React.memo(() => {
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log('SANG TEST: 1');
    return () => {
      console.log('SANG TEST 2');
    };
  }, []);
  return (
    <div
      style={{ width: 100, height: 200, backgroundColor: 'blue' }}
      onClick={() => navigate('/example')}
    />
  );
});

export default Home;
