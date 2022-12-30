import avveImg from 'assets/images/avve-logo.png';
import cakeImg from 'assets/images/cake-icon.png';
import curveImg from 'assets/images/curve-icon.png';
import incImg from 'assets/images/inc_logo.svg';
import joeImg from 'assets/images/joe-icon.png';
import raydiumImg from 'assets/images/raydium-logo.png';
import solendImg from 'assets/images/solend-logo.png';
import spookyImg from 'assets/images/spooky-icon.png';
import trisolarisImg from 'assets/images/trisolaris-icon.png';
import uniImg from 'assets/images/uni-icon.png';
import unknowImg from 'assets/images/unknow-icon.png';
import voteImg from 'assets/images/vote.svg';
import { MAIN_NETWORK_NAME } from 'constants/token';
import { SELECTION_NETWORKS } from 'pages/Swap/features/FormUnshield/FormUnshield.constants';
import { SwapExchange } from 'pages/Swap/features/FormUnshield/FormUnshield.types';
import React from 'react';
import { METRIC_TYPE, METRIC_UNIQ } from 'services/rpcMetric';

import AppItem from './App.item';
import { AppWrapper } from './Apps.styled';

interface IProps {
  selected: string;
}

export interface IFactory {
  img: string;
  name: string;
  nameDesc: string;
  status?: string;
  chain: string[];
  desc: string;
  exchange?: SwapExchange;
  metric?: METRIC_TYPE;
  metricUniq?: METRIC_UNIQ;

  link?: string;
  linkPath?: string;

  network: MAIN_NETWORK_NAME[];
}

const Factory: IFactory[] = [
  {
    img: incImg,
    name: 'Incognito DEX',
    nameDesc: 'Privacy Swap',
    status: 'SHIPPED',
    chain: ['DEX', 'Bitcoin', 'Monero'],
    desc: 'The Incognito DEX is a privacy-focused non-custodial exchange. It allows users to trade crypto anonymously by obscuring their activity from public ledger.',
    exchange: SwapExchange.PDEX,
    metric: METRIC_TYPE.PAPP_PANCAKE,
    metricUniq: METRIC_UNIQ.PAPP_PANCAKE_UNIQ,
    network: [MAIN_NETWORK_NAME.INCOGNITO],
  },
  {
    img: cakeImg,
    name: 'pPancake',
    nameDesc: 'Private Pancake Swap',
    status: 'SHIPPED',
    chain: ['Binance Smart Chain', 'DEX'],
    desc: "Trade anonymously on BNB Chain's leading DEX. Deep liquidity and super low fees – now with privacy.",
    exchange: SwapExchange.PANCAKE_SWAP,
    metric: METRIC_TYPE.PAPP_PANCAKE,
    metricUniq: METRIC_UNIQ.PAPP_PANCAKE_UNIQ,
    network: [MAIN_NETWORK_NAME.BSC],
  },
  {
    img: uniImg,
    name: 'pUniswap',
    nameDesc: 'Private Uniswap',
    status: 'SHIPPED',
    chain: ['Ethereum', 'Polygon', 'DEX'],
    desc: 'Trade confidentially on everyone’s favorite DEX. Faster and cheaper thanks to Polygon, and private like all Incognito apps.',
    exchange: SwapExchange.UNISWAP,
    metric: METRIC_TYPE.PAPP_UNISWAP,
    metricUniq: METRIC_UNIQ.PAPP_UNISWAP_UNIQ,
    network: [MAIN_NETWORK_NAME.ETHEREUM, MAIN_NETWORK_NAME.POLYGON],
  },
  {
    img: curveImg,
    name: 'pCurve',
    nameDesc: 'Private Curve',
    status: 'SHIPPED',
    chain: ['Polygon', 'DEX'],
    desc: 'Swap stablecoins with complete confidentiality using Privacy Curve. Low fees on Polygon meets full privacy on Incognito.',
    exchange: SwapExchange.CURVE,
    metric: METRIC_TYPE.PAPP_CURVE,
    metricUniq: METRIC_UNIQ.PAPP_CURVE_UNIQ,
    network: [MAIN_NETWORK_NAME.POLYGON],
  },
  {
    img: spookyImg,
    name: 'pSpooky',
    status: 'SHIPPED',
    nameDesc: 'Private Spooky Swap',
    chain: ['Fantom', 'DEX'],
    desc: 'Explore DeFi on Fantom with full privacy for your activity and assets. Swap Fantom coins anonymously with Private SpookySwap.',
    exchange: SwapExchange.SPOOKY,
    metric: METRIC_TYPE.PAPP_SPOOKY,
    metricUniq: METRIC_UNIQ.PAPP_SPOOKY_UNIQ,
    network: [MAIN_NETWORK_NAME.FANTOM],
  },
  {
    img: joeImg,
    name: 'pTraderJoe',
    status: 'SHIPPED',
    nameDesc: 'Private Trader Joe',
    chain: ['Avalanche', 'DEX'],
    desc: 'Trade confidentially on Trader Joe. Faster privacy swap is enabled by fast transaction finality on Avalanche.',
    exchange: SwapExchange.JOE,
    metric: METRIC_TYPE.PAPP_TRADER_JOE,
    metricUniq: METRIC_UNIQ.PAPP_TRADER_JOE_UNIQ,
    network: [MAIN_NETWORK_NAME.AVALANCHE],
  },
  {
    img: voteImg,
    name: 'pDAO',
    status: 'SHIPPED',
    nameDesc: 'Private DAO',
    chain: ['Ethereum'],
    desc: "Join to vote for particular proposals created by the project developers or directly create their own proposals for the ecosystem's MdSelfImprovement.",
    exchange: SwapExchange.JOE,
    metric: METRIC_TYPE.PAPP_TRADER_JOE,
    metricUniq: METRIC_UNIQ.PAPP_TRADER_JOE_UNIQ,
    network: [MAIN_NETWORK_NAME.AVALANCHE],
  },
  {
    img: trisolarisImg,
    name: 'pTrisolaris',
    status: 'COMING SOON',
    nameDesc: 'Private Trisolaris',
    chain: ['Aurora', 'DEX'],
    desc: 'Privacy Swap comes to Aurora ecosystem for the first time. Multiple AMMs for best-in-class execution, now with privacy.',
    network: [],
  },
  {
    img: raydiumImg,
    name: 'pRaydium',
    status: 'COMING SOON',
    nameDesc: 'Private Raydium',
    chain: ['Solana', 'DEX', 'Farming'],
    desc: 'Explore DeFi on Solana with full privacy for your activity and assets. Swap, provide liquidity, farm, and stake.',
    network: [],
  },
  {
    img: avveImg,
    name: 'pAave',
    status: 'COMING SOON',
    nameDesc: 'Private Aave',
    chain: ['Polygon', 'Lending'],
    desc: 'Earn interest on deposits and borrow assets on everyone’s favorite lending protocol – confidentially.',
    network: [],
  },
  {
    img: solendImg,
    name: 'pSolend',
    status: 'COMING SOON',
    nameDesc: 'Private Solend',
    chain: ['Solana', 'Lending'],
    desc: 'Get privacy for what you lend, borrow, and earn on Solana. Protect your activity from prying eyes.',
    network: [],
  },
  {
    img: unknowImg,
    name: 'pAnything',
    nameDesc: 'Private Anything',
    chain: ['Blockchain', 'Use case'],
    desc: 'The Incognito community is building out the 2022 roadmap. Which app do you want privacy for?',
    link: 'Join the conversation',
    linkPath: 'https://we.incognito.org/t/incognito-2022-technical-roadmap/15002',
    network: [],
  },
];

const AppsList = React.memo(({ selected }: IProps) => {
  const APPS = React.useMemo(() => {
    if (selected === 'All') return Factory;
    const selectedValue = SELECTION_NETWORKS.find(({ label }) => label === selected);
    if (!selectedValue) return [];
    const _apps = Factory.filter((item) => {
      return item.network.some((itemNetwork) =>
        (selectedValue?.network || []).some((selectedNetwork: any) => selectedNetwork === itemNetwork)
      );
    });
    return _apps || [];
  }, [selected]);
  return (
    <AppWrapper>
      {APPS.map((item) => (
        <AppItem data={item} key={item.name} />
      ))}
    </AppWrapper>
  );
});

export default AppsList;
