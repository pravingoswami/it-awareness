import staffData from "./mockData/staff.json";
import ticketsData from "./mockData/tickets.json";
import todosData from "./mockData/todos.json";

export const fetchStaffApi = () =>
  new Promise<typeof staffData>((resolve) =>
    setTimeout(() => resolve(staffData), 500)
  );

export const fetchTicketsApi = () =>
  new Promise<typeof ticketsData>((resolve) =>
    setTimeout(() => resolve(ticketsData), 500)
  );

export const fetchTodosApi = () =>
  new Promise<typeof todosData>((resolve) =>
    setTimeout(() => resolve(todosData), 500)
  );
