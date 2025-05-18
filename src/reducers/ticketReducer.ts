import type { Ticket } from "../types";
import {
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
  ADD_TICKET_REQUEST,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_FAILURE,
  UPDATE_TICKET_STATUS,
} from "../constants/actionTypes";

interface TicketState {
  data: Ticket[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketState = {
  data: [],
  loading: false,
  error: null,
};

type TicketAction =
  | { type: typeof FETCH_TICKETS_REQUEST }
  | { type: typeof FETCH_TICKETS_SUCCESS; payload: Ticket[] }
  | { type: typeof FETCH_TICKETS_FAILURE; payload: string }
  | { type: typeof ADD_TICKET_REQUEST }
  | { type: typeof ADD_TICKET_SUCCESS; payload: Ticket }
  | { type: typeof ADD_TICKET_FAILURE; payload: string }
  | {
      type: typeof UPDATE_TICKET_STATUS;
      payload: { id: number; status: string };
    };

export const ticketReducer = (
  state = initialState,
  action: TicketAction
): TicketState => {
  switch (action.type) {
    case FETCH_TICKETS_REQUEST:
      return { ...state, loading: true };
    case FETCH_TICKETS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_TICKETS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_TICKET_REQUEST:
      return { ...state, loading: true };
    case ADD_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [action.payload, ...state.data],
      };
    case ADD_TICKET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_TICKET_STATUS:
      return {
        ...state,
        data: state.data.map((ticket: Ticket) =>
          ticket.id === action.payload.id
            ? { ...ticket, status: action.payload.status }
            : ticket
        ),
      };
    default:
      return state;
  }
};
