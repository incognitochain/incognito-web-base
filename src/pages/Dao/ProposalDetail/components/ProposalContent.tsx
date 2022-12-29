/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import { Skeleton } from 'antd';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { Proposal } from 'state/dao/types';
import styled from 'styled-components/macro';

interface ProposalContentProps {
  proposal?: Proposal;
  isLoading?: boolean;
}

const Title = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const Container = styled.div`
  word-wrap: break-word;
  .markdown {
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: #757575;
  }

  .markdown p {
    font-size: 16px;
    color: #757575;
  }

  .markdown ul {
    list-style: disc inside;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .markdown ol {
    list-style: decimal inside;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .markdown li {
    margin-left: 24px;
    line-height: 140%;
    display: list-item;
  }

  .markdown h1 {
    font-weight: 500;
    font-size: 34px;
    margin-top: 24px;
    color: #ffffff;
    line-height: 140%;
  }

  .markdown h2 {
    font-weight: 500;
    font-size: 24px;
    margin-top: 16px;
    font-weight: bold;
    color: #ffffff;
    line-height: 140%;
  }

  .markdown h3 {
    font-size: 20px;
    margin-top: 16px;
    font-weight: 500;
    color: #ffffff;
    line-height: 140%;
  }

  .markdown img {
    max-width: 100%;
    height: auto;
  }
`;

const ProposalContent: React.FC<ProposalContentProps> = (props) => {
  const { proposal, isLoading } = props;

  return (
    <Container>
      <Title>Description</Title>
      {isLoading ? (
        <div>
          <Skeleton active />
        </div>
      ) : (
        proposal?.description && (
          <ReactMarkdown
            className="markdown"
            children={proposal?.description}
            remarkPlugins={[remarkGfm, remarkBreaks]}
          />
        )
      )}
    </Container>
  );
};

export default ProposalContent;
