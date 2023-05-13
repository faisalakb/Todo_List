import './style.css';

const todoList = [];
let list = [];
const inp = document.getElementById('inpId');
const ul = document.getElementById('ulId');
const clsBtn = document.getElementById('clsBtn');
const refres = document.getElementById('refres');
let id = 0;
refres.onclick = () => {
  window.location.reload();
};
refres.addEventListener('mouseover', () => {
  refres.classList.add('fa-spin');
});
refres.addEventListener('mouseout', () => {
  refres.classList.remove('fa-spin');
});
inp.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    if (inp.value === '') {
      alert('Please enter a todo');
    } else {
      todoList.push({ index: id += 1, title: inp.value, completed: false });
      list = JSON.stringify(todoList);
      localStorage.setItem('listItems12', list);
    }
  }
});
function display() {
  ul.innerHTML = '';
  const txt = localStorage.getItem('listItems12');
  const objData = JSON.parse(txt);
  let newIndex = 1;
  objData.forEach((element) => {
    const div = document.createElement('div');
    div.className = 'test';
    div.setAttribute('id', 'did');
    const section = document.createElement('section');
    section.id = 'se';
    section.innerHTML = `<br><br><input type="checkbox" class="chbox"  id="checkId${newIndex}">
    <li>${element.title}</li>`;
    section.appendChild(div);
    ul.appendChild(section);
    newIndex += 1;
    const checkbox = section.querySelector('input[type="checkbox"]');
    const li = section.querySelector('li');

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
    });

    div.addEventListener('click', (event) => {
      const e = event.target;
      const checkbox = e.parentElement.querySelector('input[type="checkbox"]');
      if (!checkbox) {
        return;
      }
      const id = checkbox.id.replace('checkId', '');
      const txt = localStorage.getItem('listItems12');
      const items = JSON.parse(txt);
      const itemIndex = items.findIndex((item) => item.index === parseInt(id, 10));
      const closestLi = e.parentElement.querySelector('li');
      const newInput = document.createElement('input');
      newInput.classList.add('dynInp');
      newInput.type = 'text';
      newInput.value = closestLi.textContent;
      closestLi.replaceWith(newInput);
      newInput.focus();
      newInput.addEventListener('blur', () => {
        const newTitle = newInput.value;
        if (newTitle !== '') {
          e.classList.remove('test');
          items[itemIndex].title = newTitle;
          todoList[itemIndex].title = newTitle;
          localStorage.setItem('listItems12', JSON.stringify(items));
          e.innerHTML = newTitle;
          div.innerHTML = '<span class="delete-icon "><i class="fa fa-trash delEd"></i></span>';
          const deleteIcon = div.querySelector('.delete-icon');
          if (deleteIcon) {
            deleteIcon.addEventListener('click', () => {
              const txt = localStorage.getItem('listItems12');
              const items = JSON.parse(txt);
              const itemIndex = items.findIndex((item) => item.index === parseInt(id, 10));
              items.splice(itemIndex, 1);
              localStorage.setItem('listItems12', JSON.stringify(items));
              div.parentElement.remove();
              todoList.splice(itemIndex, 1);
              todoList.forEach((item, index) => {
                item.index = index + 1;
              });
              localStorage.setItem('listItems12', JSON.stringify(todoList));
              display();
            });
          }
        }
      });
    });
  });

  // Update index values of all items
  todoList.forEach((item, index) => {
    item.index = index + 1;
  });
  localStorage.setItem('listItems12', JSON.stringify(todoList));
}
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
console.log(checkboxes);
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

inp.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    inp.value = '';
    display();
  }
});