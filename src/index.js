import './style.css';

let list = [];
const tasks = [{ description: 'wash the dishes', completed: false, index: 0 },
  { description: 'complete To Do list project', completed: false, index: 1 }];
const ul = document.getElementById('ulId');
list = JSON.stringify(tasks);
localStorage.setItem('listItems12', list);
const txt = localStorage.getItem('listItems12');
const objData = JSON.parse(txt);
function display() {
  objData.forEach((element) => {
    ul.innerHTML += `<br><input type="checkbox" class="chbox" >
      <li>${element.description}</li>
      <div class="test"></div>
      <br><br>`;
  });
}
display();