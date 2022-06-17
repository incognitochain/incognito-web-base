export interface IThemeReducer {
  darkMode: boolean;
}

const initialState: IThemeReducer = {
  darkMode: true,
};

const reducer = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  },
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
