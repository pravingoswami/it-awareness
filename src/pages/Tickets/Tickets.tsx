import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets, updateTicketStatus } from "../../actions/ticketActions";
import type { Ticket } from "../../types";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Select,
  MenuItem,
  Paper,
  Box,
  useTheme,
} from "@mui/material";
import type { AppDispatch } from "../../store/store";
import type { RootState } from "../../reducers/rootReducer";
import DataTable, {
  type DataTableColumn,
} from "../../components/DataTable/DataTable";
import "./Tickets.css";

const Tickets: React.FC = () => {
  const statusOptions = ["Open", "In Progress", "Resolved"];
  const dispatch = useDispatch<AppDispatch>();
  const tickets = useSelector((state: RootState) => state.tickets.data);
  const loading = useSelector((state: RootState) => state.tickets.loading);
  const error = useSelector((state: RootState) => state.tickets.error);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    if (!tickets || tickets.length === 0) {
      dispatch(fetchTickets());
    }
  }, [dispatch, tickets]);

  const handleDownload = (fileName: string, fileData: string) => {
    const link = document.createElement("a");
    link.href = fileData;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Open":
        return "open";
      case "In Progress":
        return "inprogress";
      case "Resolved":
        return "resolved";
      default:
        return "";
    }
  };

  // DataTable columns
  const columns: DataTableColumn<Ticket>[] = [
    {
      label: "ISSUE TYPE",
      field: "issue",
      render: (ticket) => (
        <Typography fontWeight={600} color={isDark ? "#fff" : "#1B254B"}>
          {ticket.issue}
        </Typography>
      ),
    },
    {
      label: "DESCRIPTION",
      field: "description",
      render: (ticket) => (
        <Typography color={isDark ? "#A3AED0" : "#707EAE"}>
          {ticket.description}
        </Typography>
      ),
    },
    {
      label: "STATUS",
      field: "status",
      render: (ticket) => (
        <Select
          value={ticket.status}
          onChange={(e) =>
            dispatch(updateTicketStatus(ticket.id, e.target.value))
          }
          size="small"
          className={`tickets-status-select ${getStatusClass(ticket.status)}`}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      label: "CREATED DATE",
      field: "created",
      render: (ticket) => (
        <Typography color={isDark ? "#A3AED0" : "#707EAE"}>
          {ticket.created}
        </Typography>
      ),
    },
    {
      label: "FILE",
      field: "fileName",
      render: (ticket) =>
        typeof ticket.fileData === "string" &&
        typeof ticket.fileName === "string" ? (
          <Button
            variant="outlined"
            onClick={() =>
              handleDownload(
                ticket.fileName as string,
                ticket.fileData as string
              )
            }
            className="tickets-download-btn"
          >
            Download
          </Button>
        ) : null,
    },
  ];

  return (
    <Container maxWidth={false} disableGutters sx={{ px: 0, py: 4 }}>
      <Paper
        elevation={0}
        className={`tickets-table-card${isDark ? " dark" : ""}`}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            color={isDark ? "#fff" : "#1B254B"}
          >
            Submitted Tickets
          </Typography>
        </Box>
        {loading && <CircularProgress />}
        {error && <Typography color="error">Error loading tickets!</Typography>}
        <DataTable columns={columns} data={tickets} rowKey={(row) => row.id} />
      </Paper>
    </Container>
  );
};

export default Tickets;
