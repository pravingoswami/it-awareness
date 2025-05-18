import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import StaffDirectory from "./pages/StaffDirectory/StaffDirectory";
import ITRequests from "./pages/ITRequests/ITRequests";
import Tickets from "./pages/Tickets/Tickets";
import ToDoList from "./pages/ToDoList/ToDoList";
import { ResponsiveLayout } from "./components/ResponsiveLayout/ResponsiveLayout";

const App: React.FC = () => {
  return (
    <Router>
      <ResponsiveLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/staff" element={<StaffDirectory />} />
          <Route path="/it" element={<ITRequests />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/todo" element={<ToDoList />} />
        </Routes>
      </ResponsiveLayout>
    </Router>
  );
};

export default App;
