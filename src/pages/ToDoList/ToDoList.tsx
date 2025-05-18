import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchToDos,
  addToDo,
  deleteToDo,
  toggleToDo,
  editToDo,
} from "../../actions/todoActions";
import type { ToDo } from "../../types";
import type { AppDispatch } from "../../store/store";
import {
  Card,
  CardContent,
  Box,
  Stack,
  Checkbox,
  IconButton,
  TextField,
  Button,
  Typography,
  useTheme,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./ToDoList.css";
import type { RootState } from "../../reducers/rootReducer";

const ToDoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.data);
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    if (!todos.length) {
      dispatch(fetchToDos());
    }
  }, [dispatch, todos.length]);

  const isEditing = editId !== null;

  const handleAddOrUpdate = () => {
    if (isEditing && editId !== null) {
      dispatch(editToDo(editId, newTask));
      setEditId(null);
      setNewTask("");
    } else if (newTask.trim()) {
      dispatch(addToDo(newTask));
      setNewTask("");
    }
  };

  const handleEdit = (todo: ToDo) => {
    setEditId(todo.id);
    setNewTask(todo.title);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteToDo(id));
    if (editId === id) {
      setEditId(null);
      setNewTask("");
    }
  };

  return (
    <Container>
      <Box className="todo-list-page-bg">
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
        <Box className="todo-list-content">
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            className="todo-list-input-row"
          >
            <TextField
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={isEditing ? "Update Task" : "New Task"}
              fullWidth
              size="medium"
              inputProps={{
                "aria-label": isEditing ? "Update Task" : "New Task",
              }}
            />
            <Button
              onClick={handleAddOrUpdate}
              variant="contained"
              color={isEditing ? "warning" : "primary"}
              aria-label={isEditing ? "Update Task" : "Add Task"}
              className="todo-list-add-btn"
              disabled={!newTask.trim()}
              sx={{ minWidth: 140, fontWeight: 600 }}
            >
              {isEditing ? "Update Task" : "Add Task"}
            </Button>
          </Stack>
          <Box className="todo-list-cards-container">
            {todos.length === 0 && (
              <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
                No tasks found.
              </Typography>
            )}
            {todos.map((todo: ToDo) => (
              <Card
                key={todo.id}
                className={`todo-list-item-card${
                  todo.completed ? " todo-list-item-card-secondary" : ""
                }${isDark ? " todo-list-item-card-dark" : ""}`}
                elevation={2}
                sx={
                  isDark
                    ? {
                        background: todo.completed ? "#283046" : "#23272f",
                        border: todo.completed
                          ? "1.5px solid #1976d2"
                          : "1px solid #313a49",
                        color: todo.completed ? "#90caf9" : "#fff",
                      }
                    : {}
                }
              >
                <CardContent className="todo-list-item-content">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => dispatch(toggleToDo(todo.id))}
                      inputProps={{
                        "aria-label": `Mark ${todo.title} as completed`,
                      }}
                      className="todo-list-checkbox"
                      sx={isDark ? { color: "#90caf9" } : {}}
                    />
                    <Typography
                      variant="body1"
                      className={`todo-list-task-title${
                        todo.completed ? " completed" : ""
                      }`}
                      sx={
                        isDark
                          ? {
                              color: todo.completed ? "#90caf9" : "#fff",
                            }
                          : {}
                      }
                    >
                      {todo.title}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(todo)}
                      className="todo-list-edit-btn"
                      sx={{ color: "#1976d2" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(todo.id)}
                      className="todo-list-delete-btn"
                      sx={{ color: "#d32f2f" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ToDoList;
