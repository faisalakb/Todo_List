import './style.css';

const todoList = [];
let list = [];
const inp = document.getElementById('inpId');
const ul = document.getElementById('ulId');
let id = 0;
inp.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    if (inp.value === '') {
      alert('Please enter a todo');
    } else {
      todoList.push({ count: id += 1, title: inp.value, completed: false });
      list = JSON.stringify(todoList);
      localStorage.setItem('listItems12', list);
    }
  }
});

function display() {
  ul.innerHTML = '';
  const txt = localStorage.getItem('listItems12');
  const objData = JSON.parse(txt);
  objData.forEach((element) => {
    ul.innerHTML += `<input type="checkbox" class="chbox" >
    <li>${element.title}</li>
    <div class="test"></div>
    <br>`;
  });
}

inp.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    inp.value = '';
    display();
  }
});
