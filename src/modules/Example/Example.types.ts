import { ExampleActionType } from '@modules/Example/Example.constants';
import { Action } from 'redux';

//----------------------------------------------
// Reducer Payload
//----------------------------------------------
export interface IExampleReducer {
  status: string;
}

//----------------------------------------------
// Payload Definition here!
//----------------------------------------------
export interface ExampleUpdateStatusPayload {
  status: string;
}

//----------------------------------------------
// Action Definition here!
//----------------------------------------------
export interface ExampleUpdateStatusAction extends Action {
  type: ExampleActionType.UPDATE_STATUS;
  payload: ExampleUpdateStatusPayload;
}

//-----------------------------------
export type ExampleActions = ExampleUpdateStatusAction;
