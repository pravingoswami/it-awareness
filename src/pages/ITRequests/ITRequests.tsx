import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addTicket } from "../../actions/ticketActions";
import { fetchStaff } from "../../actions/staffActions";
import type { RootState } from "../../reducers/rootReducer";
import type { StaffMember, Ticket } from "../../types";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { showAlert } from "../../utils/showAlert";
import "./ITRequests.css";
import type { AppDispatch } from "../../store/store";

const ITRequests: React.FC = () => {
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedUser, setSelectedUser] = useState<string>("");

  const staff = useSelector(
    (state: RootState) => state.staff.data
  ) as StaffMember[];
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    if (!staff || staff.length === 0) {
      dispatch(fetchStaff());
    }
  }, [dispatch, staff]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const uniqueId = Date.now();
    if (!selectedUser || !issueType) {
      showAlert({
        title: "Missing Required Fields",
        text: "Please select both Staff and Issue Type before submitting.",
        icon: "warning",
        theme: isDark ? "dark" : "light",
      });
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const ticket: Ticket = {
          id: uniqueId,
          user: selectedUser,
          issue: issueType,
          description,
          fileName: file.name,
          fileData: file ? reader.result : undefined,
          created: new Date().toISOString(),
          status: "Open",
        };
        dispatch(addTicket(ticket));
        showAlert({
          title: "Request Submitted!",
          text: "Your IT request has been submitted successfully.",
          icon: "success",
          theme: isDark ? "dark" : "light",
        });
        setIssueType("");
        setDescription("");
        setFile(null);
      };
      reader.readAsDataURL(file);
    } else {
      const ticket: Ticket = {
        id: uniqueId,
        user: selectedUser,
        issue: issueType,
        description,
        created: new Date().toISOString(),
        status: "Open",
      };
      dispatch(addTicket(ticket));
      showAlert({
        title: "Request Submitted!",
        text: "Your IT request has been submitted successfully.",
        icon: "success",
        theme: isDark ? "dark" : "light",
      });
      setIssueType("");
      setDescription("");
      setFile(null);
    }
  };

  const isSubmitDisabled = !selectedUser || !issueType;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          color={isDark ? "#fff" : "#1B254B"}
        >
          Submit an IT Request
        </Typography>
      </Box>
      <TextField
        select
        label="Select Staff"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
        {staff.map((member) => (
          <MenuItem key={member.id} value={member.email}>
            {member.name} ({member.email})
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Issue Type"
        value={issueType}
        onChange={(e) => setIssueType(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Network">Network Issue</MenuItem>
        <MenuItem value="Software">Software Bug</MenuItem>
        <MenuItem value="Hardware">Hardware Failure</MenuItem>
      </TextField>
      <TextField
        label="Description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />

      <label
        className={`upload-box${isDark ? " dark" : ""}`}
        style={{ display: "block" }}
      >
        <input type="file" onChange={handleFileChange} />
        <CloudUploadIcon className="upload-icon" />
        <div className="upload-label">
          {file ? `File: ${file.name}` : "Upload Files"}
        </div>
        <div className="upload-desc">PNG, JPG and GIF files are allowed</div>
      </label>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
        sx={{
          mt: 3,
          width: "100%",
          borderRadius: "12px",
          fontWeight: 700,
          fontSize: "1rem",
          background: "#422AFB",
          boxShadow: "none",
          color: "white",
          "&:hover": {
            background: "#3311DB",
          },
        }}
      >
        Submit Request
      </Button>
    </Container>
  );
};

export default ITRequests;
