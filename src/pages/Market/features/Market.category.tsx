import Category from 'components/Core/Category';
import { ICategory } from 'components/Core/Category/Category';
import { MarketChainIcon, MarketMoneyIcon, MarketSearchIcon } from 'components/icons';
import { marketTranslateSelector } from 'config/Configs.selector';
import React from 'react';
import { useSelector } from 'react-redux';

const MarketCategory = () => {
  const marketTrs = useSelector(marketTranslateSelector);

  const CATEGORIES = React.useMemo<ICategory[]>(() => {
    return [
      {
        icon: <MarketSearchIcon />,
        title: marketTrs.untraceable,
        subTitle: marketTrs.untraceableDetail,
        className: 'category-item-left',
      },
      {
        icon: <MarketChainIcon />,
        title: marketTrs.unlinkable,
        subTitle: marketTrs.unlinkableDetail,
        className: 'category-item-center',
      },
      {
        icon: <MarketMoneyIcon />,
        title: marketTrs.commissionFree,
        subTitle: marketTrs.commissionFreeDetail,
        className: 'category-item-right',
      },
    ];
  }, [marketTrs]);

  return <Category data={CATEGORIES} />;
};

export default React.memo(MarketCategory);
