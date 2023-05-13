import { todoList, display } from './status.js';

const inp = document.getElementById('inpId');
let list = [];
let id = 0;

// Load todo items from local storage on page load
const storedList = JSON.parse(localStorage.getItem('listItems12'));
if (storedList && storedList.length > 0) {
  todoList.push(...storedList);
  id = todoList[todoList.length - 1].index;
}

inp.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    if (inp.value === '') {
      console.log('Please enter a todo');
    } else {
      todoList.push({ index: id += 1, title: inp.value, completed: false });
      list = JSON.stringify(todoList);
      localStorage.setItem('listItems12', list);
    }
  }
});

inp.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    inp.value = '';
    display();
  }
});

// Attach event listener for checkbox change event

export { todoList, display };
