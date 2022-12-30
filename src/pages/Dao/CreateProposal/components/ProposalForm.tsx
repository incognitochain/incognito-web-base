/* eslint-disable react/no-children-prop */
import { Input, Row } from 'antd';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components/macro';

interface ProposalFormProps {
  title?: string;
  description?: string;
  onChangeTitle?: (title: string) => void;
  onChangeDescription?: (description: string) => void;
}

const { TextArea } = Input;

const Container = styled.div`
  width: 100%;
  word-wrap: break-word;
  .markdown {
    font-weight: 400;
    font-size: 16px;
    line-height: 160%;
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

  .markdown hr {
    width: 100%;
    height: 1px;
    background-color: #757575;
    border: none;
    margin-top: 32px;
    margin-bottom: 32px;
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

const LabelText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: #ffffff;
`;

const InputField = styled(Input)`
  background-color: #252525;
  color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  border-width: 0px;
  border: none;
  margin-top: 8px;

  ::placeholder {
    color: #757575;
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: #757575;
  }

  ::-ms-input-placeholder {
    color: #757575;
  }
`;

const TextAreaField = styled(TextArea)`
  background-color: #252525;
  color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  margin-top: 8px;
  width: 100%;
  border: none;
  scroll-padding: 16px;

  ::placeholder {
    color: #757575;
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: #757575;
  }

  ::-ms-input-placeholder {
    color: #757575;
  }
`;

const Space = styled.div`
  height: 24px;
`;

const PreviewContainer = styled.div`
  background-color: #252525;
  margin-top: 24px;
  border-radius: 8px;
  padding: 16px;
`;

const TitlePreview = styled.p`
  font-weight: 500;
  font-size: 34px;
  line-height: 140%;
  color: #ffffff;
`;

const ProposalForm = (props: ProposalFormProps) => {
  const { title, description, onChangeTitle, onChangeDescription } = props;
  const [proposalText, setProposalText] = useState<string>('');
  console.log(proposalText);

  const onBodyChange = (body: string) => {
    setProposalText(body);
    onChangeDescription?.(body);
  };

  const descPlaceholder = `## Summary\n\nInsert your summary here\n\n## Methodology\n\nInsert your methodology here\n\n## Conclusion\n\nInsert your conclusion here`;

  return (
    <Container>
      <Row align="middle" justify="space-between">
        <LabelText>Proposal</LabelText>
        <LabelText style={{ color: '#9C9C9C' }}>{title?.length}/250</LabelText>
      </Row>
      <InputField
        value={title}
        onChange={(e) => onChangeTitle?.(e.target.value)}
        maxLength={250}
        placeholder="Proposal Title"
      />
      <Space />
      <Row align="middle" justify="space-between">
        <LabelText>Description</LabelText>
        <LabelText style={{ color: '#9C9C9C' }}>{description?.length}/20000</LabelText>
      </Row>
      <TextAreaField
        value={description}
        rows={12}
        onChange={(e) => onBodyChange(e.target.value)}
        maxLength={20000}
        placeholder={descPlaceholder}
      />
      {proposalText !== '' && (
        <PreviewContainer>
          <LabelText>Preview</LabelText>
          {title && (
            <>
              <TitlePreview>{title}</TitlePreview>
            </>
          )}
          <ReactMarkdown className="markdown" children={proposalText} remarkPlugins={[remarkGfm, remarkBreaks]} />
        </PreviewContainer>
      )}
    </Container>
  );
};

export default ProposalForm;
