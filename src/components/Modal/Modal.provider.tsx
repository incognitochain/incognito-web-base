import { DialogContent, DialogOverlay } from '@reach/dialog';
import { RowBetween } from 'components/Core/Row';
import isArray from 'lodash/isArray';
import last from 'lodash/last';
import { transparentize } from 'polished';
import React, { useContext } from 'react';
import { animated, useSpring, useTransition } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import styled, { css } from 'styled-components/macro';
import { ThemedText } from 'theme';
import { CloseIcon } from 'theme/components';
import { isMobile } from 'utils/userAgent';

const AnimatedDialogOverlay = animated(DialogOverlay);
const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  &[data-reach-dialog-overlay] {
    z-index: 2;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.modalBG};
  }
`;

const AnimatedDialogContent = animated(DialogContent);

const StyledDialogContent = styled(({ minHeight, maxHeight, mobile, isOpen, maxWidth, ...rest }) => (
  <AnimatedDialogContent {...rest} />
)).attrs({
  'aria-label': 'dialog',
})`
  overflow-y: auto;

  &[data-reach-dialog-content] {
    margin: 16px;
    background-color: ${({ theme }) => theme.bg3};
    border: 1px solid ${({ theme }) => theme.border1};
    box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.95, theme.shadow1)};
    width: 50vw;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 24px;

    align-self: ${({ mobile }) => (mobile ? 'flex-end' : 'center')};

    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
      ${({ maxWidth }) =>
      maxWidth
        ? css`
            max-width: ${maxWidth};
          `
        : css`
            max-width: 420px;
          `}
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    ${({ theme }) => theme.mediaWidth.upToMedium`
      width: 65vw;
      margin: 0;
    `}
    ${({ theme, mobile }) => theme.mediaWidth.upToSmall`
      width:  85vw;
      ${
        mobile &&
        css`
          width: 100vw;
          border-radius: 20px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        `
      }
    `}
  }
`;

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  minHeight?: number | false;
  maxHeight?: number;
  maxWidth?: string;
  initialFocusRef?: React.RefObject<any>;
  children?: React.ReactNode;
  modalState: SetModalProps[];
}

export function Modal({
  isOpen,
  minHeight = false,
  maxHeight = 90,
  initialFocusRef,
  closeModal,
  modalState,
}: ModalProps) {
  const fadeTransition = useTransition(isOpen, null, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const lastModal = last(modalState);
  const { data: modalData, title, isTransparent, closable, isSearchTokenModal, maxWidth } = lastModal || {};

  const [{ y }, set] = useSpring(() => ({ y: 0, config: { mass: 1, tension: 210, friction: 20 } }));
  const bind = useGesture({
    onDrag: (state) => {
      set({
        y: state.down ? state.movement[1] : 0,
      });
      if (state.movement[1] > 300 || (state.velocity > 3 && state.direction[1] > 0)) {
        // onDismiss();
      }
    },
  });

  return (
    <>
      {fadeTransition.map(
        ({ item, key, props }) =>
          item && (
            <StyledDialogOverlay
              key={key}
              style={props}
              onDismiss={() => closeModal && closeModal()}
              initialFocusRef={initialFocusRef}
              unstable_lockFocusAcrossFrames={false}
            >
              <StyledDialogContent
                {...(isMobile
                  ? {
                      ...bind(),
                      style: { transform: y.interpolate((y) => `translateY(${(y as number) > 0 ? y : 0}px)`) },
                    }
                  : {})}
                aria-label="dialog content"
                minHeight={minHeight}
                maxHeight={maxHeight}
                maxWidth={maxWidth}
                mobile={isMobile}
              >
                {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
                {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
                <RowBetween className="header">
                  <ThemedText.AvgMediumLabel color="primary5">{title}</ThemedText.AvgMediumLabel>
                  <CloseIcon onClick={() => closeModal && closeModal()} />
                </RowBetween>
                {modalData}
              </StyledDialogContent>
            </StyledDialogOverlay>
          )
      )}
    </>
  );
}

interface SetModalProps {
  data: React.ReactNode;
  title?: string | React.ReactNode;
  isSearchTokenModal?: boolean;
  rightHeader?: React.ReactNode;
  isTransparent: boolean;
  closable?: boolean;
  maxWidth?: string;
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
      return (prvArr || []).slice(0, -1);
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
      {modalProps && <Modal isOpen={modalProps.length > 0} modalState={modalProps} closeModal={onCloseModal} />}
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
