import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Paper, Box } from "@mui/material";
import type { RootState } from "../../reducers/rootReducer";
import type { Ticket, ToDo } from "../../types";
import { fetchTickets } from "../../actions/ticketActions";
import { fetchToDos } from "../../actions/todoActions";
import type { AppDispatch } from "../../store/store";
import bannerBg from "../../assets/bannerImg.png";
import { useTheme } from "@mui/material/styles";
import "./Dashboard.css";
import DataTable, {
  type DataTableColumn,
} from "../../components/DataTable/DataTable";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const tickets = useSelector(
    (state: RootState) => state.tickets.data
  ) as Ticket[];
  const todos = useSelector((state: RootState) => state.todos.data) as ToDo[];

  useEffect(() => {
    if (!tickets || tickets.length === 0) {
      dispatch(fetchTickets());
    }
    if (!todos || todos.length === 0) {
      dispatch(fetchToDos());
    }
  }, [dispatch, tickets, todos]);

  const openTickets = tickets.filter((ticket) => ticket.status === "Open");
  const pendingTasks = todos.filter((todo) => !todo.completed);
  const isDark = theme.palette.mode === "dark";
  const lastOpenTicket =
    openTickets.length > 0 ? openTickets[openTickets.length - 1] : null;
  const lastPendingTask =
    pendingTasks.length > 0 ? pendingTasks[pendingTasks.length - 1] : null;

  const ticketColumns: DataTableColumn<Ticket>[] = [
    { label: "ID", field: "id" },
    { label: "Issue", field: "issue" },
    {
      label: "Status",
      field: "status",
      render: (ticket) => (
        <span className={`dashboard-status ${ticket.status.toLowerCase()}`}>
          {ticket.status}
        </span>
      ),
    },
  ];

  // DataTable columns for Open Tasks
  const taskColumns: DataTableColumn<ToDo>[] = [
    { label: "ID", field: "id" },
    { label: "Task", field: "title" },
  ];

  return (
    <Container maxWidth={false} disableGutters className="dashboard-container">
      <Box
        className="dashboard-banner"
        style={{ backgroundImage: `url(${bannerBg})` }}
      >
        <Typography variant="h3" className="dashboard-banner-title">
          Welcome to the Internal Dashboard
        </Typography>
      </Box>
      <div className="dashboard-grid-row">
        <div className="dashboard-grid-col dashboard-col-3">
          <Box className={`dashboard-card${isDark ? " dark" : ""}`}>
            <Typography
              variant="h6"
              className={`dashboard-card-title${isDark ? " dark" : ""}`}
            >
              Open IT Tickets
            </Typography>
            <Typography
              variant="h2"
              className={`dashboard-card-number${isDark ? " dark" : ""}`}
            >
              {openTickets.length}
            </Typography>
          </Box>
        </div>
        <div className="dashboard-grid-col dashboard-col-3">
          <Box className={`dashboard-card${isDark ? " dark" : ""}`}>
            <Typography
              variant="h6"
              className={`dashboard-card-title${isDark ? " dark" : ""}`}
            >
              Pending Tasks
            </Typography>
            <Typography
              variant="h2"
              className={`dashboard-card-number tasks${isDark ? " dark" : ""}`}
            >
              {pendingTasks.length}
            </Typography>
          </Box>
        </div>
        {/* Latest Update Cards */}
        <div className="dashboard-grid-col dashboard-col-3">
          <Box
            className={`dashboard-card latest-update${
              isDark ? " dark" : ""
            } dashboard-align-left`}
          >
            <Typography
              variant="subtitle1"
              className={`dashboard-card-title latest-update-title${
                isDark ? " dark" : ""
              }`}
            >
              Last Open Ticket
            </Typography>
            {lastOpenTicket ? (
              <>
                <Typography variant="body2" className="dashboard-latest-label">
                  Issue:
                </Typography>
                <Typography variant="body2" className="dashboard-latest-value">
                  {lastOpenTicket.issue}
                </Typography>
                <Typography variant="body2" className="dashboard-latest-label">
                  Status:
                </Typography>
                <Typography
                  variant="body2"
                  className={`dashboard-status ${lastOpenTicket.status.toLowerCase()}`}
                >
                  {lastOpenTicket.status}
                </Typography>
              </>
            ) : (
              <Typography variant="body2">No open tickets</Typography>
            )}
          </Box>
        </div>
        <div className="dashboard-grid-col dashboard-col-3">
          <Box
            className={`dashboard-card latest-update${
              isDark ? " dark" : ""
            } dashboard-align-left`}
          >
            <Typography
              variant="subtitle1"
              className={`dashboard-card-title latest-update-title${
                isDark ? " dark" : ""
              }`}
            >
              Last Pending Task
            </Typography>
            {lastPendingTask ? (
              <>
                <Typography variant="body2" className="dashboard-latest-label">
                  Task:
                </Typography>
                <Typography variant="body2" className="dashboard-latest-value">
                  {lastPendingTask.title}
                </Typography>
              </>
            ) : (
              <Typography variant="body2">No pending tasks</Typography>
            )}
          </Box>
        </div>
      </div>
      <div className="dashboard-table-row">
        <div className="dashboard-table-col dashboard-col-2">
          <Paper className={`dashboard-table-paper${isDark ? " dark" : ""}`}>
            <Typography variant="h6" className="dashboard-table-title">
              Open Tickets
            </Typography>
            <div className="dashboard-table-wrapper">
              <DataTable
                columns={ticketColumns}
                data={openTickets}
                rowKey={(row) => row.id}
                emptyMessage="No open tickets"
                className={`dashboard-table${isDark ? " dark" : ""}`}
                dense
              />
            </div>
          </Paper>
        </div>
        <div className="dashboard-table-col dashboard-col-2">
          <Paper className={`dashboard-table-paper${isDark ? " dark" : ""}`}>
            <Typography variant="h6" className="dashboard-table-title">
              Open Tasks
            </Typography>
            <div className="dashboard-table-wrapper">
              <DataTable
                columns={taskColumns}
                data={pendingTasks}
                rowKey={(row) => row.id}
                emptyMessage="No pending tasks"
                className={`dashboard-table${isDark ? " dark" : ""}`}
                dense
              />
            </div>
          </Paper>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
