import {
  ExampleActions,
  ExampleActionType,
  ExampleUpdateStatusPayload,
} from '@modules/Example';

const actionUpdateStatus = (payload: ExampleUpdateStatusPayload): ExampleActions => ({
  type: ExampleActionType.UPDATE_STATUS,
  payload,
});

export { actionUpdateStatus };
