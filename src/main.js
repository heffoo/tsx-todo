// import { useState } from "react";

// const [nextElement, setNextElement] = useState
export const draggable = (tasks, ActiveTask, setActiveTask) => {
  const listElement = document.querySelector(`.draggableItem`);
  const itemElements = listElement.querySelectorAll(`.task`);
  console.log("im here", ActiveTask);
  for (const item of itemElements) {
    item.draggable = true;
  }

  listElement.addEventListener(`dragstart`, (el) => {
    el.target.classList.add(`selected`);
  });

  listElement.addEventListener(`dragend`, (el) => {
    console.log("1231", el.target.value);
    el.target.classList.remove(`selected`);
  });
  console.log("3123", tasks[1].nextElement);

  const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
    const nextElement = cursorPosition < currentElementCenter ? currentElement : currentElement.nextElementSibling;
    // console.log('nexttask', nextTask)
    return nextElement;
  };

  listElement.addEventListener(`dragover`, (el) => {
    el.preventDefault();

    const activeElement = listElement.querySelector(`.selected`);
    const currentElement = el.target;
    // console.log('target', tasks.indexOf(2))

    const isMoveable = activeElement !== currentElement && currentElement.classList.contains(`task`);

    if (!isMoveable) {
      return;
    }

    const nextElement = getNextElement(el.clientY, currentElement);
    // const nextTask = getNext(el.clientY, ActiveTask);

    console.log("nextElement", nextElement);
    if ((nextElement && activeElement === nextElement.previousElementSibling) || activeElement === nextElement) {
      return;
    }
    listElement.insertBefore(activeElement, nextElement);
  });
  console.log("tasks ", tasks);
};
