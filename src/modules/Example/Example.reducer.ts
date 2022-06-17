import { ExampleActionType } from '@modules/Example/Example.constants';
import { ExampleActions, IExampleReducer } from '@modules/Example/Example.types';
import { Reducer } from 'redux';

export const initialState: IExampleReducer = {
  status: '',
};

export const reducer: Reducer<IExampleReducer, ExampleActions> = (
  state = initialState,
  action: ExampleActions,
) => {
  switch (action.type) {
    case ExampleActionType.UPDATE_STATUS: {
      // Update status
      const { status } = action.payload;
      return {
        ...state,
        status,
      };
    }
    default:
      return state;
  }
};

export default reducer;
