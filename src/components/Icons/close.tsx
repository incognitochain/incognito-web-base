import { X } from 'react-feather';
import styled from 'styled-components/macro';

const CloseIcon = styled(X)<{ onClick: () => void }>`
  cursor: pointer;
`;

export default CloseIcon;
