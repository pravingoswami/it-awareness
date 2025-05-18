import type { Dispatch } from "redux";
import {
  FETCH_STAFF_REQUEST,
  FETCH_STAFF_SUCCESS,
  FETCH_STAFF_FAILURE,
} from "../constants/actionTypes";
import { fetchStaffApi } from "../api/mockApi";

export const fetchStaff = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_STAFF_REQUEST });
  try {
    const response = await fetchStaffApi();
    dispatch({ type: FETCH_STAFF_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: FETCH_STAFF_FAILURE, payload: error });
  }
};
