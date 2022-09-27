// import { CopyIcon, OpenLinkIcon } from '@components/Icons';
import CopyIcon from 'components/Copy';
import OpenLink from 'components/OpenLink';
import React from 'react';
import { ThemedText } from 'theme';

import { IItemDetail } from './ItemDetail.interface';
import { Styled } from './ItemDetail.styled';

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ItemDetail = React.memo((props: IItemDetail) => {
  const {
    customItem,
    title,
    desc,
    copyData = '',
    link = '',
    descClassName = '',
    titleClassName = '',
    descColor = '',
    disabled = false,
    message = '',
    sub,
    hookClassName = '',
  } = props;
  const toggleStatusMessage = !!message;
  const [toggle, setToggle] = React.useState(false);

  const handleOpenLink = () => window.open(link);
  if (disabled) {
    return null;
  }
  if (customItem) {
    return customItem;
  }
  if (!desc) {
    return null;
  }
  return (
    <Styled>
      <div className="history-tx-item">
        <ThemedText.SmallLabel color="primary8" className={`sub-text title ${titleClassName}`}>
          {title}
        </ThemedText.SmallLabel>
        <div className={`hook ${hookClassName}`}>
          <ThemedText.SmallLabel className={`ellipsis desc ${descClassName}`} style={{ color: descColor }}>
            {!!desc && capitalizeFirstLetter(desc)}
          </ThemedText.SmallLabel>
          {!!sub && sub}
          {message && (
            <div
              className={`${toggleStatusMessage ? 'toggle-message' : ''} arrow-icon center-abs-ver`}
              onClick={() => setToggle(!toggle)}
            >
              {/*{toggle ? <ArrowDownIcon /> : <ArrowUpIcon />}*/}
            </div>
          )}
          {!!copyData && <CopyIcon text={copyData} size={20} />}
          {!!link && <OpenLink onClick={handleOpenLink} />}
        </div>
      </div>
      {!!message && toggle && <p className="fs-small sub-text message" dangerouslySetInnerHTML={{ __html: message }} />}
    </Styled>
  );
});

ItemDetail.displayName = 'ItemDetail';

export default React.memo(ItemDetail);
