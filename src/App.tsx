import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useReducer, useState } from "react";
import { v1 } from "uuid";
import { CreateItemForm } from "./CreateItemForm";
import { TodolistItem } from "./TodolistItem";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";
import { containerSx } from "./TodolistItem.styles";
import { NavButton } from "./NavButton";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistsReducer,
} from "./model/todolists-reducer";
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer } from "./model/tasks-reducer";

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
};

export type Task = {
  id: string
  title: string
  isDone: boolean
};

export type FilterValues = "all" | "active" | "completed";

export type TasksState = Record<string, Task[]>;

type ThemeMode = "dark" | "light";

export const App = () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, dispatchTasksReducer] = useReducer( tasksReducer,{
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#087EA4",
      },
    },
  });

  const changeMode = () => {
    setThemeMode(themeMode == "light" ? "dark" : "light");
  };

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatchToTodolistReducer(changeTodolistFilterAC({ id: todolistId, filter }));
  };

  const createTodolist = (title: string) => {
    const action = createTodolistAC(title);
    dispatchToTodolistReducer(action);
    dispatchTasksReducer(action);
  };
  const deleteTodolist = (todolistId: string) => {
    const action = deleteTodolistAC(todolistId);
    dispatchToTodolistReducer(action);
    dispatchTasksReducer(action);
  };

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatchToTodolistReducer(changeTodolistTitleAC({ id: todolistId, title }));
  };

  const deleteTask = (todolistId: string, taskId: string) => {
    dispatchTasksReducer(deleteTaskAC({todolistId, taskId}))
  };

  const createTask = (todolistId: string, title: string) => {
    dispatchTasksReducer(createTaskAC({todolistId, title}))
  };

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatchTasksReducer(changeTaskStatusAC({todolistId, taskId, isDone}))
  };

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatchTasksReducer(changeTaskTitleAC({todolistId, taskId, title}))
  };
  const todolistItem = todolists.map(todolist => {
    const todolistTasks = tasks[todolist.id];
    let filteredTasks = todolistTasks;
    if (todolist.filter === "active") {
      filteredTasks = todolistTasks.filter(task => !task.isDone);
    }
    if (todolist.filter === "completed") {
      filteredTasks = todolistTasks.filter(task => task.isDone);
    }

    return (
      <Grid key={todolist.id}>
        <Paper sx={{ p: "0 20px 20px 20px" }}>
          <TodolistItem
            todolist={todolist}
            tasks={filteredTasks}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            deleteTodolist={deleteTodolist}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
          />
        </Paper>
      </Grid>
    );
  })
  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <AppBar position="static" sx={{ mb: "30px" }}>
          <Toolbar>
            <Container maxWidth={"lg"} sx={containerSx}>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <div>
                <NavButton>Sign in</NavButton>
                <NavButton>Sign up</NavButton>
                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                <Switch color={"default"} onChange={changeMode} />
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth={"lg"}>
          <Grid container sx={{ mb: "30px" }}>
            <CreateItemForm onCreateItem={createTodolist} />
          </Grid>
          <Grid container spacing={4}>
            {todolistItem}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

