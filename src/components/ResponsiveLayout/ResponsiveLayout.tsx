import React, { useState } from "react";
import { Drawer, IconButton, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Link, useLocation } from "react-router-dom";
import { useColorMode } from "../../utils/colorModeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import logo from "../../assets/logo.webp";
import "./ResponsiveLayout.css";

const drawerWidth = 240;

const navItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Staff Directory", icon: <PeopleIcon />, path: "/staff" },
  { text: "IT Requests", icon: <AssignmentIcon />, path: "/it" },
  { text: "Tickets", icon: <ConfirmationNumberIcon />, path: "/tickets" },
  { text: "To-Do List", icon: <ListAltIcon />, path: "/todo" },
];

export const ResponsiveLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const location = useLocation();

  const rootClass =
    "responsive-layout-root" +
    (theme.palette.mode === "dark" ? " dark" : "") +
    (mobileOpen ? " sidebar-mobile-open" : "");

  const drawer = (
    <div className="sidebar-root">
      <div className="sidebar-logo">
        <img src={logo} alt="IR Management Logo" />
      </div>
      <hr className="sidebar-divider" />
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.text}
            to={item.path}
            className={`sidebar-nav-link${
              location.pathname === item.path ? " selected" : ""
            }`}
            onClick={() => setMobileOpen(false)}
          >
            {item.icon}
            <span>{item.text}</span>
          </Link>
        ))}
      </nav>
      <hr className="sidebar-divider" />
      <div className="sidebar-theme-toggle">
        <IconButton
          color="inherit"
          onClick={toggleColorMode}
          aria-label="toggle theme"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
        <span className="sidebar-theme-label">
          {theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
        </span>
      </div>
    </div>
  );

  return (
    <div className={rootClass}>
      {/* Mobile AppBar */}
      <div className="sidebar-mobile-appbar">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "none", sm: "block" },
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "transparent",
            border: "none",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: theme.palette.mode === "dark" ? "#111c44" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "#1B254B",
            border: "none",
            "& .sidebar-root": {
              background: theme.palette.mode === "dark" ? "#111c44" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "#1B254B",
            },
            "& .sidebar-divider": {
              borderTop:
                theme.palette.mode === "dark"
                  ? "1.5px solid #232a3b"
                  : "1.5px solid #e3e6ef",
            },
            "& .sidebar-nav-link.selected": {
              background: theme.palette.mode === "dark" ? "#232a3b" : "#e3f0ff",
              color:
                theme.palette.mode === "dark"
                  ? "#90caf9"
                  : theme.palette.primary.main,
            },
            "& .sidebar-nav-link, & .sidebar-nav-link span, & .sidebar-nav-link svg":
              {
                color: theme.palette.mode === "dark" ? "#bfc8db" : "#7b809a",
              },
            "& .sidebar-nav-link.selected svg": {
              color:
                theme.palette.mode === "dark"
                  ? "#90caf9"
                  : theme.palette.primary.main,
            },
            "& .sidebar-theme-toggle .MuiIconButton-root": {
              color:
                theme.palette.mode === "dark"
                  ? "#90caf9"
                  : theme.palette.primary.main,
              background: theme.palette.mode === "dark" ? "#232a3b" : "#e3f0ff",
            },
            "& .sidebar-theme-toggle .MuiIconButton-root:hover": {
              background: theme.palette.primary.main,
              color: "#fff",
            },
            "& .sidebar-theme-label": {
              color: theme.palette.mode === "dark" ? "#bfc8db" : "#7b809a",
            },
          },
        }}
      >
        {drawer}
      </Drawer>
      <div className="responsive-layout-main">{children}</div>
    </div>
  );
};
