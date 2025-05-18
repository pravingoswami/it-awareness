import type { Dispatch } from "redux";
import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  EDIT_TODO,
} from "../constants/actionTypes";
import { fetchTodosApi } from "../api/mockApi";

export const fetchToDos = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_TODOS_REQUEST });

  try {
    const response = await fetchTodosApi();
    dispatch({ type: FETCH_TODOS_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: FETCH_TODOS_FAILURE, payload: error });
  }
};

export const addToDo = (title: string) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), title, completed: false },
});

export const deleteToDo = (id: number) => ({
  type: DELETE_TODO,
  payload: id,
});

export const toggleToDo = (id: number) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const editToDo = (id: number, title: string) => ({
  type: EDIT_TODO,
  payload: { id, title },
});
