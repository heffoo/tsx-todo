export const draggable = () => {
  const listElement = document.querySelector(`.draggableItem`);
console.log(listElement)
const itemElements = listElement.querySelectorAll(`.task`);

for (const item of itemElements) {
  item.draggable = true;
}

listElement.addEventListener(`dragstart`, (el) => {
  el.target.classList.add(`selected`);
});

listElement.addEventListener(`dragend`, (el) => {
  el.target.classList.remove(`selected`);
});

const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
  console.log(currentElementCoord, currentElementCenter);

  const nextElement = cursorPosition < currentElementCenter ? currentElement : currentElement.nextElementSibling;
  return nextElement;
};

listElement.addEventListener(`dragover`, (el) => {
  el.preventDefault();

  const activeElement = listElement.querySelector(`.selected`);
  const currentElement = el.target;

  const isMoveable = activeElement !== currentElement && currentElement.classList.contains(`task`);

  if (!isMoveable) {
    return;
  }

  const nextElement = getNextElement(el.clientY, currentElement);
  console.log(nextElement);

  if ((nextElement && activeElement === nextElement.previousElementSibling) || activeElement === nextElement) {
    return;
  }
  listElement.insertBefore(activeElement, nextElement);
});

}
