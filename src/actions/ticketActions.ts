import type { Dispatch } from "redux";
import { fetchTicketsApi } from "../api/mockApi";
import {
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
  ADD_TICKET_REQUEST,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_FAILURE,
} from "../constants/actionTypes";
import type { Ticket } from "../types";
import type { RootState } from "../reducers/rootReducer";

export const fetchTickets =
  () => (dispatch: Dispatch, getState: () => RootState) => {
    const { tickets } = getState();
    if (tickets.data && tickets.data.length > 0) return; // Already loaded
    dispatch({ type: FETCH_TICKETS_REQUEST });
    fetchTicketsApi()
      .then((response) =>
        dispatch({ type: FETCH_TICKETS_SUCCESS, payload: response })
      )
      .catch((error) =>
        dispatch({ type: FETCH_TICKETS_FAILURE, payload: error })
      );
  };

export const addTicket = (ticket: Ticket) => async (dispatch: Dispatch) => {
  dispatch({ type: ADD_TICKET_REQUEST });
  try {
    // Simulate async
    setTimeout(() => {
      dispatch({ type: ADD_TICKET_SUCCESS, payload: ticket });
    }, 500);
  } catch (error) {
    dispatch({ type: ADD_TICKET_FAILURE, payload: error });
  }
};

export const updateTicketStatus = (id: number, status: string) => ({
  type: "UPDATE_TICKET_STATUS",
  payload: { id, status },
});
