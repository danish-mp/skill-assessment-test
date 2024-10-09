// Action to set header data
export const setHeaderData = (data) => ({
  type: "SET_HEADER",
  payload: data,
});

// Action to add sale detail
export const addDetail = (detail) => ({
  type: "ADD_DETAIL",
  payload: detail,
});

// Action to remove sale detail
export const removeDetail = (id) => ({
  type: "REMOVE_DETAIL",
  payload: { id },
});
