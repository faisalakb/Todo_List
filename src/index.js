import './style.css';
import { todoList, display } from './storeItems.js';

const clsBtn = document.getElementById('clsBtn');
const refres = document.getElementById('refres');

refres.onclick = () => {
  window.location.reload();
};
refres.addEventListener('mouseover', () => {
  refres.classList.add('fa-spin');
});
refres.addEventListener('mouseout', () => {
  refres.classList.remove('fa-spin');
});

function del() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const txt = localStorage.getItem('listItems12');
  const items = JSON.parse(txt);

  for (let i = checkboxes.length - 1; i >= 0; i -= 1) {
    if (checkboxes[i].checked) {
      checkboxes[i].parentElement.remove();
      items.splice(i, 1);
    }
  }

  const uncheckedItems = items.filter((item) => !item.completed);
  todoList.splice(0, todoList.length, ...uncheckedItems);

  // Update index numbers
  todoList.forEach((item, index) => {
    item.index = index + 1;
  });
  const updatedList = JSON.stringify(todoList);
  localStorage.setItem('listItems12', updatedList);

  return 0;
}

clsBtn.addEventListener('click', (event) => {
  console.log(event);
  del();
});

display();