import { DialogOverlay } from '@reach/dialog';
import useOutsideRef from 'hooks/useDetectClickOutside';
import { isArray } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import AppBody from 'pages/AppBody';
import React, { useContext } from 'react';
import { animated } from 'react-spring';
import styled from 'styled-components/macro';
import { CloseIcon, ThemedText } from 'theme';

import { RowBetween } from '../Core/Row';

const AnimatedDialogOverlay = animated(DialogOverlay);
const StyledDialogOverlay = styled(AnimatedDialogOverlay)``;

const Styled = styled(StyledDialogOverlay)<{ isTransparent: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  .break-line {
  }
  .modal-content-wrapper {
    overflow: hidden;
    position: absolute;
  }
  .close-icon {
    z-index: 2;
    margin-left: auto;
    font-size: 14px;
  }
  .modal-loading-tx {
    position: relative;
    height: 100%;
  }
  .header {
    margin-top: 0;
  }
  .modal-data {
    flex: 1;
  }
  .wrap-content {
    padding-top: 24px;
  }
  .label {
    margin-bottom: 8px;
    text-align: center;
  }
  .min-height {
    min-height: 90vh;
  }
`;

export interface IProps {
  modalState: SetModalProps[];
  closeModal: any;
}

const Modal = (props: IProps) => {
  const { modalState, closeModal } = props;
  const lastModal = last(modalState);
  const ref: any = React.useRef({});
  const { data: modalData, title, rightHeader, isTransparent, closable, isSearchTokenModal } = lastModal || {};
  useOutsideRef(ref, closable ? closeModal : undefined);
  if (isEmpty(lastModal)) {
    return null;
  }
  const renderModalContent = () => {
    return (
      <AppBody className={`modal-content-wrapper ${isSearchTokenModal ? 'min-height' : ''}`} ref={ref}>
        <RowBetween className="header">
          <ThemedText.AvgMediumLabel color="primary5">{title}</ThemedText.AvgMediumLabel>
          <CloseIcon onClick={() => closeModal && closeModal()} />
        </RowBetween>
        {modalData}
      </AppBody>
    );
  };

  return (
    <Styled isTransparent={!!isTransparent} className="modal-wrapper">
      {renderModalContent()}
    </Styled>
  );
};

interface SetModalProps {
  data: React.ReactNode;
  title?: string | React.ReactNode;
  isSearchTokenModal?: boolean;
  rightHeader?: React.ReactNode;
  isTransparent: boolean;
  closable?: boolean;
}
interface LoadingContextType {
  setModal: (_: SetModalProps) => void;
  clearAllModal: () => void;
  closeModal: () => void;
}
const ModalContextInit = {
  setModal: () => null,
  clearAllModal: () => null,
  closeModal: () => null,
};

const ModalContext = React.createContext<LoadingContextType>(ModalContextInit);

export function ModalProvider(props: any) {
  const [modalProps, setModal] = React.useState<SetModalProps[]>([]);
  const children = React.useMemo(() => props.children, []);

  const appendModal = (modal: SetModalProps) => {
    if (!modal.data) return;
    setModal((prvModals) => {
      if (prvModals && !isArray(prvModals)) {
        return [prvModals, modal];
      }
      return (prvModals || []).concat([modal]);
    });
  };

  const clearAllModal = () => {
    setModal([]);
  };

  const onCloseModal = () =>
    setModal((prvArr: any) => {
      const newArr = (prvArr || []).slice(0, -1);
      return newArr;
    });

  return (
    <ModalContext.Provider
      value={{
        setModal: appendModal,
        clearAllModal,
        closeModal: onCloseModal,
      }}
    >
      <>{children}</>
      {modalProps && <Modal modalState={modalProps} closeModal={onCloseModal} />}
    </ModalContext.Provider>
  );
}

export const useModal = (): LoadingContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal not found, useModal must be used within the <ModalProvider>..</ModalProvider>');
  }
  return context;
};
