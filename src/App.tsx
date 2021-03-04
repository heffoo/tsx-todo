import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import React from "react";
import { Task } from "./components/Task";

export interface intTask {
  title: string;
  completed: boolean;
  id: string;
}

export type DeleteTask = (id: string) => void;

function App() {
  const [tasks, setTasks] = useState<intTask[]>([{ title: "value", completed: false, id: "1" }]);

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
    // localStorage.setItem("data", JSON.stringify([{ title: value, completed: false, id: uuidv4() }, ...tasks]));
    form.elements.addTaskInput.value = "";
  };


  const delTask: DeleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const checkedTask = (id: string) => {
    const tasksChecked = tasks.map((task) => {
      if (task.id === id) return { ...task, completed: !task.completed };
      else return task;
    });
    setTasks(tasksChecked);
  };

  return (
    <div className="App">
      <div className="form">
        <form name="searchForm" onSubmit={onSubmit}>
          <input type="text" name="addTaskInput" />
        </form>
        <div>
          {tasks.map((task: intTask, index: number) => (
            <Task key={task.id} task={task} checkedTask={checkedTask} index={index} tasks={tasks} delTask={delTask} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
