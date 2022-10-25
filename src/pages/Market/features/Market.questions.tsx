import { memo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useHistory } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components/macro';

import AskQuestionItem from './AskQuestionItem';

const questions: any = [
  {
    title: 'What is Incognito wallet extension?',
    answer:
      'Incognito wallet extension is a crypto wallet compatible with Incognito blockchain. It allows users to manage their keychains in a variety of ways while isolating them from the site context. With Incognito wallet extension, you can easily store, send and receive funds on the Incognito blockchain. Additionally, you can also use the wallet extension for signing a transaction requesting from privacy app websites.',
  },
  {
    title: 'Why must I install Incognito wallet extension in order to use swap function from the Incognito website?',
    answer:
      'Incognito wallet extension is used for signing a swap transaction requesting from the Incognito website then submitting the signed transaction to an Incognito fullnode for executing the swap. The swapped coins will then be populated in the wallet extension so that you can manage or send the coins over Incognito blockchain.',
  },
  {
    title: 'Where does liquidity come from?',
    answer:
      'Incognito exchange’s liquidity comes from two sources:\n\n1. Native privacy DEX (pDEX) for pools containing coins from non smart contract blockchains such as PRV, BTC, XMR, ZEC, LTC and DASH.\n\n2. Integrated external DEXes such as Uniswap, Curve, PancakeSwap and SpookSwap.',
  },
  {
    title: 'What are swap fees?',
    answer:
      'The swap fee will depend on what liquidity pool a swap is executed with.\n\n- If you are swapping with an AMM DEX on an external blockchain then the fees will be the total of:\n\n1. Transaction fee: Incognito collects a small network fee of 0.0000001 PRV to pay the validators who help power the network.\n\n2. External blockchain’s gas fee: A swap request needs to be sent and executed against a DEX (say Uniswap) on an external blockchain (say Ethereum) and users need to pay for the gas cost.\n\n3. AMM swap fee: the fee varies per asset per route per exchange that the swap is executed on (e.g., 0.3% for Uniswap, 0.25% for PancakeSwap, …). Liquidity providers of the AMM pools take the fee.\n\n4. Privacy fee: Incognito takes a fee (0.1%) for operating the privacy exchange.\n\n- If you are swapping with Incognito pDEX then the fees will be the total of:\n\n1. Transaction fee: Incognito collects a small network fee of 0.0000001 PRV to pay the validators who help power the network.\n\n2. AMM swap fee: the fee varies per asset per route that the swap is executed on. If a route has multiple pools, it would charge 0.25% per pool. Liquidity providers of the pDEX pools take the fee.',
  },
];

const Styled = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  .leftView {
    display: flex;
    flex: 1;
    flex-direction: column;
    .title-container {
      text-align: left;
      .title-custom {
        width: 100%;
      }
      .description-custom {
        width: 100%;
        margin-top: 24px;
      }
    }
  }

  .rightView {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .br {
    display: block;
    margin-bottom: 16px;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToLarge`
    margin-top: 80px;
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToMedium`
    margin-top: 40px;
    flex-direction: column;
      .leftView .title-container {
        text-align: center;
        .title-custom {
          width: 100%;
        }
      }
      .rightView {
        margin-top: 40px;
      }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.mediaWidth.upToSmall`
    margin-top: 20px;
  `}
`;

const AnswerItem = ({ answer }: any) => {
  const text = answer.replace(/\n/g, '<span class="br"></span>');
  return <h6 dangerouslySetInnerHTML={{ __html: text }} style={{ color: '#9C9C9C' }}></h6>;
};

const ValidatorAskedQuestion = () => {
  const history = useHistory();
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
      <div className="leftView" style={{ marginRight: isMobile ? 0 : 80 }}>
        <div className="title-container center">
          <h1 className="title-custom">Frequently asked questions</h1>
        </div>
        <div className="title-container center">
          <h6 className="description-custom" style={{ color: '#9C9C9C' }}>
            Incognito exchange is a one-stop shop that facilitates anonymous swap for all coins across many popular
            blockchains such as Bitcoin, Monero, Ethereum, BNB Chain, Avalanche, etc. While every existing DEX has its
            own drawback: sufficient liquidity but no privacy or privacy supported but shortage liquidity, Incognito
            exchange takes a novel approach to achieve both by implementing privacy via zero-knowledge proofs,
            inter-blockchain trading with huge liquidity via interoperable dApps (a.k.a DEXs such as Uniswap, Curve,
            PancakeSwap and SpookySwap).
          </h6>
        </div>
      </div>
      <div className="rightView">
        {questions?.map((question: any, i: number) => (
          <AskQuestionItem
            key={i}
            itemOnClick={itemOnClick}
            title={question?.title}
            isActive={question?.title === activeText}
            subItem={<AnswerItem answer={question?.answer} />}
          />
        ))}
      </div>
    </Styled>
  );
};

export default memo(ValidatorAskedQuestion);