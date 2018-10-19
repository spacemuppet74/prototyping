export const ADD_NEW_USER = "ADD_NEW_USER";

export const addNewUser = user => {
  return {
    type: ADD_NEW_USER,
    payload: {
      user
    }
  };
};
