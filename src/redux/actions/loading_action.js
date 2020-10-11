export const setLoadingTrue = () => {
  return {
    type: 'loading_true',
    payload: true,
  };
};

export const setLoadingFalse = () => {
  return {
    type: 'loading_false',
    payload: false,
  };
};
