// Reducer for header data
export const headerReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_HEADER":
      return action.payload;
    default:
      return state;
  }
};

// Reducer for detail data
export const detailReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_DETAIL":
      return [...state, action.payload];
    case "REMOVE_DETAIL":
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
};
