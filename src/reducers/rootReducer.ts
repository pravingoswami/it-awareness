import { combineReducers } from "redux";
import { staffReducer } from "./staffReducer";
import { ticketReducer } from "./ticketReducer";
import { todoReducer } from "./todoReducer";

export const rootReducer = combineReducers({
  staff: staffReducer,
  tickets: ticketReducer,
  todos: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
