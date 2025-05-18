import type { ToDo } from "../types";
import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  EDIT_TODO,
} from "../constants/actionTypes";

interface TodoState {
  data: ToDo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  data: [],
  loading: false,
  error: null,
};

type TodoAction =
  | { type: typeof FETCH_TODOS_REQUEST }
  | { type: typeof FETCH_TODOS_SUCCESS; payload: ToDo[] }
  | { type: typeof FETCH_TODOS_FAILURE; payload: string }
  | { type: typeof ADD_TODO; payload: ToDo }
  | { type: typeof DELETE_TODO; payload: number }
  | { type: typeof TOGGLE_TODO; payload: number }
  | { type: typeof EDIT_TODO; payload: { id: number; title: string } };

export const todoReducer = (
  state = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return { ...state, loading: true };
    case FETCH_TODOS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_TODOS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_TODO:
      return { ...state, data: [...state.data, action.payload] };
    case DELETE_TODO:
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== action.payload),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        data: state.data.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case EDIT_TODO:
      return {
        ...state,
        data: state.data.map((todo: ToDo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo
        ),
      };
    default:
      return state;
  }
};
