import {
  FETCH_STAFF_REQUEST,
  FETCH_STAFF_SUCCESS,
  FETCH_STAFF_FAILURE,
} from "../constants/actionTypes";

const initialState = { data: [], loading: false, error: null };

export const staffReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_STAFF_REQUEST:
      return { ...state, loading: true };
    case FETCH_STAFF_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_STAFF_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
