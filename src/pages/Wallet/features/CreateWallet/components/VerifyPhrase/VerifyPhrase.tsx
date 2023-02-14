import { ButtonPrimary } from 'components/Core/Button';
import { shuffle } from 'lodash';
import AlertMessage, { AlertMessageType } from 'pages/Wallet/components/AlertMessage/AlertMessage';
import MnemonicItem from 'pages/Wallet/components/Mnemonic';
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
      <p className="title">Verify your phrase</p>
      <p className="desc">Fill in the words to verify your phrase backup</p>
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

      <div className="box">
        <p className="text-phrase">{phraseSelectedString}</p>
      </div>

      {!isPhraseCorrect && isAbleVerify && (
        <AlertMessage type={AlertMessageType.error} message="That's not quite right" />
      )}

      <ButtonPrimary className="btn" disabled={!isPhraseCorrect} onClick={props.onVerifySuccess}>
        <p className="text-btn">Continue</p>
      </ButtonPrimary>
    </Container>
  );
};

export default React.memo(VerifyPhrase);
