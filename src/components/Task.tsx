import "../App.scss";
import React, { FC, ChangeEvent } from "react";
import { useState } from "react";
import { intTask, DeleteTask } from "../App";

interface Props {
  task: intTask;
  index: number;
  delTask: DeleteTask;
  tasks: Array<any>;
  checkedTask: any;
}

export const Task: FC<Props> = ({ task, index, tasks, delTask, checkedTask }) => {
  const [edited, setEdited] = useState<boolean>(false);

  const editTask = (id: any, value: any) => {
    console.log("im here", id, value);
    let elemTask = tasks[id];
    console.log("elemTask", elemTask);
    elemTask.title = value;
  };

  const editFunc = (index: any) => {
    const value = (document.getElementsByClassName("editTaskInp")[0] as HTMLInputElement).value;
    if (edited && value.length) {
      editTask(index, value);
    }
    setEdited(!edited);
  };

  return (
    <li className="task" key={task.id}>
      <input type="checkbox" checked={task.completed} onChange={() => checkedTask(task.id)} />
      {edited ? (
        <div>
          <input
            type="text"
            className="editTaskInp"
            defaultValue={task.title}
            onKeyPress={(e: any) => e.key === "Enter" && editFunc(index)}
          />
        </div>
      ) : (
        <p className={task.completed ? "struckouted" : "normalText"}>{task.title}</p>
      )}

      {!edited ? (
        <button onClick={() => setEdited(!edited)}>edit</button>
      ) : (
        <button onClick={() => editFunc(index)}>save</button>
      )}
      <button onClick={() => delTask(task.id)}>del</button>
    </li>
  );
};
