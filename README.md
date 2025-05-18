# Internal IT/Staff Management Dashboard

A modern, responsive React + TypeScript dashboard for internal IT and staff management, built with Redux, Material UI, and mock API integration.

---

## 🚀 Setup Instructions

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Run unit tests:**
   ```sh
   npm test
   ```

---

## 📝 Features Completed

- **Dashboard:**
  - Welcome banner
  - Quick summary cards (open tickets, pending tasks, latest updates)
  - Tables for open tickets and tasks (using reusable DataTable component)
- **Staff Directory:**
  - List of staff in a responsive table (with name, role, email, status, last login, device)
  - Status icons and color coding
- **IT Requests:**
  - Submit IT request form (issue type, description, file upload)
  - Required field validation and dark mode support
- **Tickets:**
  - List of submitted tickets (issue, description, status, created date, file download)
  - Status can be updated inline
- **To-Do List:**
  - Add, edit, delete, and mark tasks as complete
  - Modern card-based UI, mobile-friendly, dark mode
- **Reusable Components:**
  - DataTable, ActionButton, FormRow, CardContainer, SectionTitle, EmptyState
- **State Management:**
  - Redux with async mock API integration for all data
- **UI/UX:**
  - Material UI, full dark/light mode, responsive design, accessibility improvements
  - SweetAlert2 for user feedback (theme-aware)
- **Testing:**
  - Basic unit tests for routing and main pages/components

---

## 🤔 Assumptions Made

- Mock API data is sufficient for demo purposes (no real backend)
- All users have the same permissions (no authentication/authorization)
- File upload is simulated (no actual file storage)
- Google Workspace-like info (last login, device) is included in mock data

---

## 🛠️ If I Had More Time

- Add user authentication and role-based access (admin/staff)
- Implement real backend API integration
- Add pagination, sorting, and filtering to tables
- More comprehensive unit and integration tests
- Polish error handling and loading skeletons
- Add user profile and settings page

---

## 📁 Project Structure

- `src/pages/` — Main pages (Dashboard, StaffDirectory, ITRequests, Tickets, ToDoList)
- `src/components/` — Reusable UI components (DataTable, ActionButton, etc.)
- `src/store/` — Redux store setup
- `src/actions/` — Redux actions
- `src/reducers/` — Redux reducers
- `src/api/` — Mock API and data
- `src/utils/` — Theme provider, alert helpers, color mode context
- `src/__tests__/` — Unit tests

---

## 📦 Submission

- [GitHub Repository Link](https://github.com/pravingoswami/it-awareness)
- [Live Project Link](https://it-awareness.netlify.app/)
- Or download the zipped folder and follow the setup instructions above.
