import { AppButton, Space, Typography } from 'components/Core';
import { shuffle } from 'lodash';
import AlertMessage, { AlertMessageType } from 'pages/IncWebWallet/components/AlertMessage/AlertMessage';
import MnemonicItem from 'pages/IncWebWallet/components/Mnemonic';
import React from 'react';

import { Container, MnemonicItemWrapper } from './VerifyPhrase.styled';

interface VerifyPhraseProps {
  phrase: string;
  onVerifySuccess: () => void;
}

const VerifyPhrase = (props: VerifyPhraseProps) => {
  const phraseList = props.phrase.split(' ') as string[];

  const [phraseListSelected, setPhraseListSelected] = React.useState<string[]>([]);

  const mnemonicCorrect = React.useMemo(() => phraseList.join(' '), []);
  const phraseListShuffle = React.useMemo(() => shuffle(phraseList), []);

  const [isPhraseCorrect, phraseSelectedString, isAbleVerify] = React.useMemo(() => {
    const phraseSelectedJoin = phraseListSelected.join(' ');
    return [
      phraseSelectedJoin === mnemonicCorrect,
      phraseSelectedJoin,
      phraseListSelected.length === phraseList.length,
    ];
  }, [phraseListSelected]) as [boolean, string, boolean];

  const mnemonicItemChoose = (title: string) => {
    const newPhraseListSelected = [...phraseListSelected];
    const findIndex = newPhraseListSelected.findIndex((item) => item === title);
    if (findIndex !== -1) {
      newPhraseListSelected.splice(findIndex, 1);
    } else {
      newPhraseListSelected.push(title || '');
    }
    setPhraseListSelected(newPhraseListSelected);
  };

  return (
    <Container>
      <Space.Vertical size={50} />
      <Typography.Text type="h4" fontWeight={700}>
        Verify your phrase
      </Typography.Text>
      <Space.Vertical size={16} />
      <Typography.Text type="p2" fontWeight={400} color={'gray_9C9C9C'}>
        Fill in the words to verify your phrase backup
      </Typography.Text>
      <div className="mnemonic-box">
        {phraseListShuffle.map((item, index) => (
          <MnemonicItemWrapper key={item}>
            <MnemonicItem
              key={item}
              index={index}
              title={item}
              disabled={false}
              onClick={() => mnemonicItemChoose(item)}
            />
          </MnemonicItemWrapper>
        ))}
      </div>
      <Space.Vertical size={40} />
      <div className="box">
        <Typography.Text type="h7" fontWeight={600} color={'white'}>
          {phraseSelectedString}
        </Typography.Text>
      </div>
      {!isPhraseCorrect && isAbleVerify && (
        <AlertMessage type={AlertMessageType.error} message="That's not quite right" />
      )}

      <Space.Vertical size={40} />
      <AppButton
        variant="contained"
        buttonType="primary"
        width={'100%'}
        disabled={!isPhraseCorrect}
        onClick={props.onVerifySuccess}
      >
        {'Verify'}
      </AppButton>
    </Container>
  );
};

export default React.memo(VerifyPhrase);
