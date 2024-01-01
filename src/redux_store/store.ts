import { createStore } from "redux";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const store = createStore(userReducer);

export default store;
