import { memo, useState } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';

import AskQuestionItem from '../../Market/features/AskQuestionItem';

const questions: any = [
  {
    title: 'How it works?',
    subsAnswers: [
      {
        title: '• Shield ETH into Incognito wallet to have privacy ETH (pETH) on Incognito network.',
        subs: [],
      },
      {
        title: '',
        titleElement: (
          <p className="h8 childrenView">
            • ETH shielded is locked in a{' '}
            <a href="https://etherscan.io/tokenholdings?a=0x43D037A562099A4C2c95b1E2120cc43054450629">smart contract</a>{' '}
            on Ethereum
          </p>
        ),
        subs: [],
      },
      {
        title:
          '• pETH will be burned on the Incognito chain to unlock ETH in the smart contract on Ethereum when you buy a NFT on OpenSea.',
        subs: [],
      },
      {
        title: '• The NFT will be sent to your designated address on Ethereum once the purchase is done.',
        subs: [],
      },
      {
        title:
          '• It is highly recommended to use a completely new address whenever you buy NFT with pOpenSea to keep your history private.',
        subs: [],
      },
    ],
  },
  {
    title: 'How does pOpenSea provide anonymity for users’ NFT purchases?',
    subsAnswers: [
      {
        title: '',
        titleElement: (
          <p className="h8 childrenView">
            • Users’ ETH shielded will be locked in a{' '}
            <a href="https://etherscan.io/tokenholdings?a=0x43D037A562099A4C2c95b1E2120cc43054450629">smart contract</a>{' '}
            on Ethereum altogether as a pool to convert it into pETH on the Incognito chain.
          </p>
        ),
        subs: [],
      },
      {
        title:
          '• When a user buys a NFT on OpenSea, their pETH will be burned on Incognito chain to unlock ETH from smart contract on Ethereum.',
        subs: [],
      },
      {
        title:
          '• This burn transaction is privacy-guaranteed by zero-knowledge proofs. Hence, it is impossible to track the input of ETH or the purchaser.',
        subs: [],
      },
      {
        title: '• In other words, the buyer is completely anonymous.',
        subs: [],
      },
    ],
  },
];

const Styled = styled.div`
  display: flex;
  max-width: 880px;
  padding-top: 120px;
  padding-bottom: 120px;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  .titleView {
    display: flex;
    flex-direction: column;
    .title-container {
      .title-custom {
        text-align: center;
        font-weight: 700;
      }
      .description-custom {
        width: 100%;
        margin-top: 24px;
      }
    }
  }

  .questionView {
    margin-top: 40px;
  }

  .br {
    display: block;
    margin-bottom: 16px;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSupperLarge`
    padding-top: 120px;
    padding-bottom: 120px;
    max-width: 880px;
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
    max-width: 720px;
    padding-top: 100px;
    padding-bottom: 100px;
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    padding-top: 40px;
    padding-bottom: 40px;
    flex-direction: column;
      .titleView .title-container {
        .title-custom {
          width: 100%;
        }
      }
      .questionView {
        margin-top: 40px;
      }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    padding-top: 20px;
  `}
`;

const AnswerItem = ({ answer }: any) => {
  const text = answer.replace(/\n/g, '<span class="br"></span>');
  return <p className="h8" dangerouslySetInnerHTML={{ __html: text }} style={{ color: '#9C9C9C' }}></p>;
};

const POpenseaNFTDetailQuestion = () => {
  const [activeText, setActiveText] = useState<string>('');

  const itemOnClick = (text: string) => {
    if (text === activeText) {
      setActiveText('');
    } else {
      setActiveText(text);
    }
  };

  return (
    <Styled>
      <div className="titleView">
        <div className="title-container">
          <h3 className="title-custom">FAQs</h3>
        </div>
        {/* <div className="title-container">
          <p className="h8 description-custom" style={{ color: '#9C9C9C' }}>
            pOpenSea is a DApp that allows you to purchase NFTs and crypto collectibles on the largest web3 marketplace
            - Opensea - with full privacy on Incognito.
          </p>
        </div> */}
      </div>
      <div className="questionView">
        {questions?.map((question: any, i: number) => (
          <AskQuestionItem
            key={i}
            itemOnClick={itemOnClick}
            title={question?.title}
            isActive={question?.title === activeText}
            // subItem={<AnswerItem answer={question?.answer} />}
            subsAnswers={question?.subsAnswers}
          />
        ))}
      </div>
    </Styled>
  );
};

export default memo(POpenseaNFTDetailQuestion);
