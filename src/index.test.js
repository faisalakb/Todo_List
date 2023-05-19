import { todoList, display } from '../modules/storeItems.js';

describe('Edit Item', () => {
  beforeEach(() => {
    todoList.length = 0;
  });

  it('should update the title of an item', () => {
    const sampleItem = { index: 1, title: 'Sample Item', completed: false };
    todoList.push(sampleItem);
    display();

    const itemDiv = document.getElementById('did');
    window.addEventListener('DOMContentLoaded', () => {
      itemDiv.click();

      const inputField = document.querySelector('.dynInp');
      inputField.value = 'Updated Item';
      inputField.dispatchEvent(new Event('blur'));

      expect(todoList[0].title).toBe('Updated Item');
    });
  });

  it('should keep the same title if the new title is empty', () => {
    const sampleItem = { index: 1, title: 'Sample Item', completed: false };
    todoList.push(sampleItem);
    display();

    window.addEventListener('DOMContentLoaded', () => {
      const itemDiv = document.getElementById('did');
      itemDiv.click();

      const inputField = document.querySelector('.dynInp');
      inputField.value = '';
      inputField.dispatchEvent(new Event('blur'));

      expect(todoList[0].title).toBe('Sample Item');
    });
  });

  it('should update the title in the DOM after editing', () => {
    const sampleItem = { index: 1, title: 'Sample Item', completed: false };
    todoList.push(sampleItem);
    display();
  });

  window.addEventListener('DOMContentLoaded', () => {
    const itemDiv = document.getElementById('did');
    itemDiv.click();
    const inputField = document.querySelector('.dynInp');
    inputField.value = 'Updated Item';
    inputField.dispatchEvent(new Event('blur'));

    const updatedItemTitle = document.querySelector('li').textContent;
    expect(updatedItemTitle).toBe('Updated Item');
  });
  it('should update the title in local storage after editing', () => {
    const sampleItem = { index: 1, title: 'Sample Item', completed: false };
    todoList.push(sampleItem);
    display();

    const itemDiv = document.getElementById('did');
    window.addEventListener('DOMContentLoaded', () => { itemDiv.click(); });

    const inputField = document.querySelector('.dynInp');
    window.addEventListener('DOMContentLoaded', () => {
      inputField.value = 'Updated Item';
      inputField.dispatchEvent(new Event('blur'));

      const storedList = JSON.parse(localStorage.getItem('listItems12'));
      expect(storedList[0].title).toBe('Updated Item');
    });
  });

  // for status update

  it('should mark an item as completed when checkbox is checked', () => {
    const sampleItem = { index: 1, title: 'Sample Item', completed: false };
    todoList.push(sampleItem);
    display();
    window.addEventListener('DOMContentLoaded', () => {
      const checkbox = document.getElementById('checkId1');
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change'));

      expect(todoList[0].completed).toBe(true);
    });
  });

  it('should mark an item as incomplete when checkbox is unchecked', () => {
    const sampleItem = { index: 1, title: 'Sample Item', completed: true };
    todoList.push(sampleItem);
    display();
    window.addEventListener('DOMContentLoaded', () => {
      const checkbox = document.getElementById('checkId1');
      checkbox.checked = false;
      checkbox.dispatchEvent(new Event('change'));
      expect(todoList[0].completed).toBe(false);
    });
  });

  it('should update the completed status in local storage when checkbox is checked', () => {
    const sampleItem = { index: 1, title: 'Sample Item', completed: false };
    todoList.push(sampleItem);
    display();
    window.addEventListener('DOMContentLoaded', () => {
      const checkbox = document.getElementById('checkId1');
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change'));
      const storedList = JSON.parse(localStorage.getItem('listItems12'));
      expect(storedList[0].completed).toBe(true);
    });
  });

  it('should update the completed status in local storage when checkbox is unchecked', () => {
    const sampleItem = { index: 1, title: 'Sample Item', completed: true };
    todoList.push(sampleItem);
    display();
    window.addEventListener('DOMContentLoaded', () => {
      const checkbox = document.getElementById('checkId1');
      checkbox.checked = false;
      checkbox.dispatchEvent(new Event('change'));
      const storedList = JSON.parse(localStorage.getItem('listItems12'));
      expect(storedList[0].completed).toBe(false);
    });
  });

  it('should remove all completed items from the todoList', () => {
    const item1 = { index: 1, title: 'Item 1', completed: true };
    const item2 = { index: 2, title: 'Item 2', completed: false };
    const item3 = { index: 3, title: 'Item 3', completed: true };

    todoList.push(item1, item2, item3);
    display();
    window.addEventListener('DOMContentLoaded', () => {
      const clearBtn = document.getElementById('clsBtn');
      clearBtn.click();

      const completedItems = todoList.filter((item) => item.completed);
      expect(completedItems.length).toBe(0);
      expect(todoList.length).toBe(1); // Verify that incomplete items are still present in the list
    });
  });

  it('should remove all completed items from the DOM', () => {
    const item1 = { index: 1, title: 'Item 1', completed: true };
    const item2 = { index: 2, title: 'Item 2', completed: false };
    const item3 = { index: 3, title: 'Item 3', completed: true };

    todoList.push(item1, item2, item3);
    display();
    window.addEventListener('DOMContentLoaded', () => {
      const clearBtn = document.getElementById('clsBtn');
      clearBtn.click();
    });

    const completedItemElements = document.querySelectorAll('.completed');
    expect(completedItemElements.length).toBe(0);
  });
});
