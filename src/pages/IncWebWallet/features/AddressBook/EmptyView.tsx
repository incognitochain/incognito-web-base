import React from 'react';
import styled from 'styled-components/macro';

export interface EmptyProps {
  title?: string;
  description?: string;
}

const Styled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  .desc {
    margin-top: 24px;
  }
`;

const EmptyView: React.FC<any> = ({ description }: { description: any }) => {
  return (
    <Styled>
      {/* <img src="../../../icons/ic_empty.png" width="70" height="70" alt="empty" /> */}
      {!!description && <p className="desc">{description}</p>}
    </Styled>
  );
};

export default EmptyView;
