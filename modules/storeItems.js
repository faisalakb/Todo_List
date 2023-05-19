import { todoList, display } from './status.js';

const inp = document.getElementById('inpId');

let id = 0;
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

// Load todo items from local storage on page load
const storedList = JSON.parse(localStorage.getItem('listItems12'));
if (storedList && storedList.length > 0) {
  todoList.push(...storedList);
  id = todoList[todoList.length - 1].index;
}
window.addEventListener('DOMContentLoaded', () => {
  inp.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      if (inp.value === '') {
        console.log('Please enter a todo');
      } else {
        todoList.push({ index: id += 1, title: inp.value, completed: false });
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

        clsBtn.addEventListener('click', () => {
          del();
        });
      }
    }
  });

  inp.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      inp.value = '';
      display();
    }
  });
});
// Attach event listener for checkbox change event

export { todoList, display };