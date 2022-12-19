/* eslint-disable react/no-children-prop */

import { ButtonConfirmed } from 'components/Core/Button';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import AddressBox from './components/AddressBox';
import InfoBox from './components/InfoBox';
import { ModalConfirm } from './components/ModalConfirm';
const AddressWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DescriptionBox = styled.div``;

const ProposalDetail = () => {
  const [modalConfirmVisible, setModalConfirmVisible] = useState<boolean>(false);

  let { id }: any = useParams();
  return (
    <div className="default-padding-horizontal">
      <div style={{ marginBottom: 40 }}>
        <h3>{id} SharkLabs -- A nounish incubator by SharkDAO</h3>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <p style={{ fontSize: 18, color: '#757575' }}>Proposed by </p>
          <p style={{ fontSize: 18, color: '#1A73E8' }}>0xa3...4bcw</p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <p>Switch to delegate view</p>
        <ButtonConfirmed
          onClick={() => setModalConfirmVisible(true)}
          height={'40px'}
          type="submit"
          backgroundColor={'#9C9C9C'}
          style={{ width: 145 }}
        >
          Submit vote
        </ButtonConfirmed>
      </div>
      <AddressWrapper>
        <AddressBox
          addresses={[
            '0xc96f20099...59b9b1065b1',
            '0x07887ee0b...c6a0a16977d',
            '0xf894fea04l...b15c12debee9',
            '0x9e64b47bl...87b84c416c0c',
            '0x9e64b47bl...87b84c416c0c',
          ]}
          leftTitle="For"
          rightTitle="20"
          color="#0ECB81"
        />
        <div style={{ width: 24 }} />
        <AddressBox
          addresses={[
            '0xc96f20099...59b9b1065b1',
            '0x07887ee0b...c6a0a16977d',
            '0xf894fea04l...b15c12debee9',
            '0x9e64b47bl...87b84c416c0c',
            '0x9e64b47bl...87b84c416c0c',
          ]}
          leftTitle="Against"
          rightTitle="20"
          color="#F6465D"
        />
        <div style={{ width: 24 }} />
        <AddressBox
          addresses={[
            '0xc96f20099...59b9b1065b1',
            '0x07887ee0b...c6a0a16977d',
            '0xf894fea04l...b15c12debee9',
            '0x9e64b47bl...87b84c416c0c',
            '0x9e64b47bl...87b84c416c0c',
          ]}
          leftTitle="Abstain"
          rightTitle="20"
          color="#9C9C9C"
        />
      </AddressWrapper>

      <AddressWrapper>
        <InfoBox leftTitle="Threshold" rightTitle="Current Quorum" rightValue="54 votes" />
        <div style={{ width: 24 }} />
        <InfoBox leftTitle="End" rightTitle="1:05 PM GMT+7" rightValue="December 1, 2022" />
        <div style={{ width: 24 }} />
        <InfoBox leftTitle="Snapshot" rightTitle="Taken at block" rightValue="16037748" />
      </AddressWrapper>
      <DescriptionBox>
        <h3 style={{ marginTop: 80 }}>What is Lorem Ipsum?</h3>
        <h6>Why do we use it?</h6>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard
          dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <img
          src="https://imgur.com/ZdV5hbZ.png"
          alt="house of nouns (1).png"
          style={{ width: '100%', verticalAlign: 'middle', marginTop: 40, marginBottom: 40 }}
        ></img>

        <h6>Why do we use it?</h6>
        <p>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking
          at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
          opposed to using, making it look like readable English. Many desktop publishing packages and web page editors
          now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected
          humour and the like).
        </p>
      </DescriptionBox>
      <ModalConfirm isOpen={modalConfirmVisible} />
    </div>
  );
};
export default ProposalDetail;
