import { ComponentType, FC, useCallback, useState } from 'react';
import styled from 'styled-components/macro';

import { ConfirmPasswordModal } from '../components/ConfirmPassword';

const ContainerWrapper = styled.div`
  flex-direction: column;
  display: flex;

  .blur {
    filter: blur(8px);
    -webkit-filter: blur(8px);
  }

  :hover {
    cursor: pointer;
  }
`;

const OverlayView = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const withBlur =
  <P extends any>(Component: ComponentType<P>): FC<P> =>
  (props: any) => {
    const [isShowConfirmPassword, setShowConfirmPassword] = useState(false);
    const [overlayView, setOverlayView] = useState(true);

    const confirmSuccess = useCallback(() => {
      setShowConfirmPassword(false);
      setOverlayView(false);
    }, []);

    const onClicked = useCallback((e: any) => {
      setShowConfirmPassword(true);
    }, []);

    const onBacked = useCallback(() => {
      setTimeout(() => {
        setShowConfirmPassword(false);
      }, 10);
    }, []);

    const onClick = overlayView ? onClicked : undefined;

    return (
      <ContainerWrapper onClick={onClick}>
        <div className={overlayView ? 'blur' : ''}>
          <Component {...props}></Component>
          {overlayView && <OverlayView />}

          {isShowConfirmPassword && (
            <ConfirmPasswordModal
              isModalOpen={isShowConfirmPassword}
              onBack={onBacked}
              confirmSuccess={confirmSuccess}
            />
          )}
        </div>
      </ContainerWrapper>
    );
  };

export default withBlur;
