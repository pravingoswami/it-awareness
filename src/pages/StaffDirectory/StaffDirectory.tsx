import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff } from "../../actions/staffActions";
import type { StaffMember } from "../../types";
import { Container, Typography, Paper, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorIcon from "@mui/icons-material/Error";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import EmailIcon from "@mui/icons-material/Email";
import { useTheme } from "@mui/material/styles";
import "./StaffDirectory.css";
import DataTable, {
  type DataTableColumn,
} from "../../components/DataTable/DataTable";
import type { AppDispatch } from "../../store/store";
import type { RootState } from "../../reducers/rootReducer";

const statusColor = (status: string, isDark: boolean) => {
  switch (status.toLowerCase()) {
    case "active":
    case "approved":
      return "#01B574";
    case "disable":
    case "disabled":
      return "#EE5D50";
    case "error":
      return "#FEB200";
    default:
      return isDark ? "#A3AED0" : "#A0AEC0";
  }
};

const statusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
    case "approved":
      return <CheckCircleIcon sx={{ color: "#01B574", mr: 1 }} />;
    case "disable":
    case "disabled":
      return <CancelIcon sx={{ color: "#EE5D50", mr: 1 }} />;
    case "error":
      return <ErrorIcon sx={{ color: "#FEB200", mr: 1 }} />;
    default:
      return <ErrorIcon sx={{ color: "#A0AEC0", mr: 1 }} />;
  }
};
const StaffDirectory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const staff = useSelector((state: RootState) => state.staff.data);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  // Define columns for DataTable
  const columns: DataTableColumn<StaffMember>[] = [
    {
      label: "NAME",
      field: "name",
      render: (member) => (
        <Typography fontWeight={600} color={isDark ? "#fff" : "#1B254B"}>
          {member.name}
        </Typography>
      ),
    },
    {
      label: "DEPARTMENT",
      field: "role",
      render: (member) => (
        <Typography color={isDark ? "#A3AED0" : "#707EAE"}>
          {member.role}
        </Typography>
      ),
    },
    {
      label: "STATUS",
      field: "status",
      render: (member) => (
        <Box display="flex" alignItems="center">
          {statusIcon(member.status)}
          <Typography
            fontWeight={500}
            color={statusColor(member.status, isDark)}
          >
            {member.status}
          </Typography>
        </Box>
      ),
    },
    {
      label: "EMAIL",
      field: "email",
      render: (member) => (
        <Box display="flex" alignItems="center">
          <EmailIcon sx={{ color: "#7551FF", mr: 1, fontSize: 18 }} />
          <Typography color={isDark ? "#A3AED0" : "#707EAE"}>
            {member.email}
          </Typography>
        </Box>
      ),
    },
    {
      label: "LAST LOGIN",
      field: "lastLogin",
      render: (member) => (
        <Typography color={isDark ? "#A3AED0" : "#707EAE"}>
          {member.lastLogin || "N/A"}
        </Typography>
      ),
    },
    {
      label: "DEVICE",
      field: "device",
      render: (member) => (
        <Box display="flex" alignItems="center">
          <DeviceHubIcon sx={{ color: "#3965FF", mr: 1, fontSize: 18 }} />
          <Typography color={isDark ? "#A3AED0" : "#707EAE"}>
            {member.device || "N/A"}
          </Typography>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth={false} disableGutters sx={{ px: 0, py: 4 }}>
      <Paper
        elevation={0}
        className={`staff-table-card${isDark ? " dark" : ""}`}
        sx={{
          width: "100%",
          background: isDark ? "#111c44" : "#fff",
          color: isDark ? "#fff" : "#1B254B",
        }}
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
            Staff Directory
          </Typography>
        </Box>
        <DataTable columns={columns} data={staff} rowKey={(row) => row.id} />
      </Paper>
    </Container>
  );
};

export default StaffDirectory;
