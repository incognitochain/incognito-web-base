import React from 'react';
import styled from 'styled-components/macro';
import { ThemedText } from 'theme';
export interface EmptyProps {
  title?: string;
  description?: string;
}

const Container = styled.div`
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
    <Container>
      {/* <img src="../../../icons/ic_empty.png" width="70" height="70" alt="empty" /> */}
      {!!description && (
        <ThemedText.MediumLabel fontWeight={600} color="primary9">
          {description}
        </ThemedText.MediumLabel>
      )}
    </Container>
  );
};

export default EmptyView;
