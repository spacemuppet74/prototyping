import { ADD_NEW_USER } from "../actions/formActions";

const initialState = {
  test: 42,
  users: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_USER: {
      console.log("action ", action);
      const { payload } = action;
      const { user } = payload;
      return {
        ...state,
        users: {
          ...state.users,
          [user.ID]: user
        }
      };
    }
    default:
      return state;
  }
}
