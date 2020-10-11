const initialState = {
  loading: true,
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case 'loading_true':
      return {
        ...state,
        loading: true,
      };
    case 'loading_false':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default loading;
