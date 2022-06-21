import { useAppDispatch, useAppSelector } from '@src/app-redux';
import { IRootState } from '@src/app-redux/interface';
import {
  actionAddPopup,
  actionRemovePopup,
  actionSetOpenModal,
  ApplicationModal,
  PopupContent,
} from '@src/app-redux/state/application';
import { DEFAULT_TXN_DISMISS_MS } from 'constants/misc';
import { useCallback, useMemo } from 'react';

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useAppSelector((state) => state.application.openModal);
  return openModal === modal;
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal);
  const dispatch = useAppDispatch();
  return useCallback(
    () => dispatch(actionSetOpenModal({ openModal: open ? null : modal })),
    [dispatch, modal, open],
  );
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET);
}

// returns a function that allows adding a popup
export function useAddPopup(): (
  content: PopupContent,
  key: string,
  removeAfterMs?: number,
) => void {
  const dispatch = useAppDispatch();

  return useCallback(
    (content: PopupContent, key: string, removeAfterMs?: number) => {
      dispatch(
        actionAddPopup({
          content,
          key,
          removeAfterMs: removeAfterMs ?? DEFAULT_TXN_DISMISS_MS,
        }),
      );
    },
    [dispatch],
  );
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useAppDispatch();
  return useCallback(
    (key: string) => {
      dispatch(actionRemovePopup({ key }));
    },
    [dispatch],
  );
}

// get the list of active popups
export function useActivePopups(): IRootState['application']['popupList'] {
  const list = useAppSelector((state: IRootState) => state.application.popupList);
  return useMemo(() => list.filter((item) => item.show), [list]);
}
