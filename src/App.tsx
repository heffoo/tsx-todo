import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import React from "react";
import { Task } from "./components/Task/Task";
import { Stars } from "./components/stars/stars";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";
import { ThemeProvider } from "@material-ui/styles";
import {draggable} from "./main.js"
export interface intTask {
  title: string;
  completed: boolean;
  id: string;
}

export type DeleteTask = (id: string) => void;
setTimeout(() => {
  draggable()
}, 500);

function App() {
  const [tasks, setTasks] = useState<intTask[]>(JSON.parse(localStorage.getItem("data") ?? ""));
  const [bgOn, isBgOn] = useState<boolean>(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = document.forms.searchForm;
    const value: string = form.elements.addTaskInput.value;
    const task = { title: value, completed: false, id: uuidv4() };
    if (value.length) {
      setTasks([task, ...tasks]);
    } else {
      alert("type smth");
    }
    localStorage.setItem("data", JSON.stringify([{ title: value, completed: false, id: uuidv4() }, ...tasks]));
    form.elements.addTaskInput.value = "";
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: blue[900],
      },
      secondary: {
        main: grey[900],
      },
    },
  });

  const delTask: DeleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    localStorage.setItem("data", JSON.stringify(filteredTasks));
  };

  const checkedTask = (id: string) => {
    const tasksChecked = tasks.map((task) => {
      if (task.id === id) return { ...task, completed: !task.completed };
      else return task;
    });
    setTasks(tasksChecked);
    localStorage.setItem("data", JSON.stringify(tasksChecked));
  };
  
  return (
    <div className={bgOn ? "App" : "App2"}>
      <button className={!bgOn ? "bgButton" : "bgButton2"} onClick={() => isBgOn(!bgOn)}>
        {!bgOn ? "bg on" : "bg off"}
      </button>

      {bgOn && <Stars />}
      <div className="form">
        {/* <button onClick={() => setSort()}>sort by <p>{sort === 'down' ? '▼' : 'yes'}</p></button> */}
        <form name="searchForm" onSubmit={onSubmit}>
          <ThemeProvider theme={theme}>
            <TextField
              type="text"
              id="standard-basic"
              name="addTaskInput"
              color={!bgOn ? "secondary" : "primary"}
              label="Введите задачу"
            />
          </ThemeProvider>
        </form>
        <ul className="draggableItem" id="draggableItem">
          {tasks.map((task: intTask, index: number) => (
              <Task key={task.id} task={task} checkedTask={checkedTask} index={index} tasks={tasks} delTask={delTask} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
