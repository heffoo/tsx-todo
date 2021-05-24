import "./Task.scss";
import React, { FC } from "react";
import { useState } from "react";
import { intTask, DeleteTask } from "../../App";
import createIcon from "../../img/create.svg";
import saveIcon from "../../img/save.svg";
import delIcon from "../../img/del.svg";
import deleteIcon from "../../img/delete.svg";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import "../../main.js"
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
    let elemTask = tasks[id];
    elemTask.title = value;
  };

  const editFunc = (index: any) => {
    const value = (document.getElementsByClassName("editTaskInp")[0] as HTMLInputElement).value;
    if (edited && value.length) {
      editTask(index, value);
    }
    setEdited(!edited);
  };
console.log(deleteIcon)
  return (
    <li className="task" id="task" key={task.id}>
      <div className="valueTitle">
        {/* <input type="checkbox" className="checkbox" checked={task.completed} onChange={() => checkedTask(task.id)} /> */}

        <Checkbox checked={task.completed} color="primary" onChange={() => checkedTask(task.id)} name="checkedA" />

        {edited ? (
          <input
            type="text"
            className="editTaskInp"
            defaultValue={task.title}
            onKeyPress={(e: any) => e.key === "Enter" && editFunc(index)}
          />
        ) : (
          <p className={task.completed ? "struckouted" : "normalText"}>{task.title}</p>
        )}
      </div>
      <div className="buttons">
        {!edited ? (
          <button className="formIcon" onClick={() => setEdited(!edited)}>
            <img alt="" src={createIcon}></img>
          </button>
        ) : (
          <button className="formIcon" onClick={() => editFunc(index)}>
            <img alt="" src={saveIcon}></img>
          </button>
        )}

        <button className="delButton" onClick={() => delTask(task.id)}>
          <img alt="" src={deleteIcon}></img>
        </button>

      </div>
    </li>
  );
};
