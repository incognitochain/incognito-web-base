import CopyIcon from 'components/Copy';
import React from 'react';
import { shortenString } from 'utils';
import { humanFileSize } from 'utils/fileUtils';
import format from 'utils/format';

import { Container, Content, Row, Title } from './MyInscriptionHistoryItem.styled';

type Props = {
  item?: any;
  index?: number;
};

const MyInscriptionHistoryItem = (props: Props) => {
  const { item, index } = props;
  if (!item) return null;

  const { eventType, txId, fileSize, fileType, timestamp, toAddress, tokenID } = item;
  return (
    <Container>
      <Row>
        {/* <Title>{'Event Type:'}</Title> */}
        <Content className={`${eventType === 'SEND' ? 'eventSend' : 'eventCreate'} `}>{eventType}</Content>
      </Row>
      <Row>
        <Title>{'TxID:'}</Title>
        <Row>
          <Content>{shortenString(txId || '', 14)}</Content>
          <CopyIcon text={txId} size={20} />
        </Row>
      </Row>
      {tokenID && (
        <Row>
          <Title>{'TokenID:'}</Title>
          <Row>
            <Content>{shortenString(tokenID || '', 14)}</Content>
            <CopyIcon text={tokenID} size={20} />
          </Row>
        </Row>
      )}
      {toAddress && (
        <Row>
          <Title>{'To Address:'}</Title>
          <Row>
            <Content>{shortenString(toAddress, 14)}</Content>
            <CopyIcon text={toAddress} size={20} />
          </Row>
        </Row>
      )}
      <Row>
        <Title>{'File Size:'}</Title>
        <Content>{humanFileSize(fileSize || 0)}</Content>
      </Row>
      <Row>
        <Title>{'File Type:'}</Title>
        <Content>{fileType}</Content>
      </Row>
      <Row>
        <Title>{'Time:'}</Title>
        <Content>{format.formatDateTime({ dateTime: timestamp })}</Content>
      </Row>
    </Container>
  );
};

export default React.memo(MyInscriptionHistoryItem);
