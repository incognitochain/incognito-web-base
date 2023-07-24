/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import InscriptionList from './components/InscriptionList';
import { Container } from './Inscriptions.styles';

const Inscriptions = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();
  React.useEffect(() => {}, []);
  return (
    <Container>
      {/* <DescriptionContent/> */}
      <InscriptionList></InscriptionList>
    </Container>
  );
};

export default React.memo(Inscriptions);
