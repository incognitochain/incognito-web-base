import copy from 'copy-to-clipboard';
import React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components/macro';

interface IProps {
  text?: string;
  size?: number;
}

const Styled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

// eslint-disable-next-line react/display-name
const CopyVector = React.memo((props: any) => {
  const { size = 24 } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M17.8463 19.9486H6.56413C6.42812 19.9486 6.29768 19.8946 6.20151 19.7984C6.10533 19.7022 6.0513 19.5718 6.0513 19.4358V6.10231C6.0513 5.83029 5.94324 5.56941 5.7509 5.37707C5.55855 5.18472 5.29767 5.07666 5.02565 5.07666C4.75363 5.07666 4.49275 5.18472 4.30041 5.37707C4.10806 5.56941 4 5.83029 4 6.10231V19.9486C4 20.4927 4.21612 21.0144 4.60081 21.3991C4.98551 21.7838 5.50726 21.9999 6.0513 21.9999H17.8463C18.1183 21.9999 18.3792 21.8919 18.5715 21.6995C18.7639 21.5072 18.872 21.2463 18.872 20.9743C18.872 20.7022 18.7639 20.4414 18.5715 20.249C18.3792 20.0567 18.1183 19.9486 17.8463 19.9486Z"
        fill="white"
      />
      <path
        d="M20.6669 5.1385L17.7541 2.26667C17.6691 2.18195 17.5684 2.11479 17.4575 2.06903C17.3466 2.02328 17.2278 1.99982 17.1079 2H8.50267C8.26058 2 8.02839 2.09617 7.85721 2.26736C7.68602 2.43855 7.58984 2.67073 7.58984 2.91283V17.3848C7.58984 17.6269 7.68602 17.8591 7.85721 18.0302C8.02839 18.2014 8.26058 18.2976 8.50267 18.2976H20.0105C20.2526 18.2976 20.4848 18.2014 20.656 18.0302C20.8271 17.8591 20.9233 17.6269 20.9233 17.3848V5.78466C20.9254 5.66535 20.9038 5.54681 20.8598 5.4359C20.8158 5.32499 20.7502 5.2239 20.6669 5.1385Z"
        fill="white"
      />
    </svg>
  );
});

const CopyIcon = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { text, size } = props;
  const handleCopyText = () => {
    if (text) {
      toast.success('Copied');
      copy(text);
    }
  };
  return (
    <Styled onClick={handleCopyText}>
      <CopyVector size={size} />
    </Styled>
  );
};

export default CopyIcon;
