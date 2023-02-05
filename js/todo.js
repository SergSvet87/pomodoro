import { changeActiveBtn, stop } from './control.js';
import { state } from './state.js';

const titleElem = document.querySelector('.title');
const countNumElem = document.querySelector('.count_num');
const todoListElem = document.querySelector('.todo__list');

// const todoItemAdd = document.createElement('li');
// todoItemAdd.classList.add('todo__item');

const todoAddBtn = document.createElement('button');
todoAddBtn.classList.add('todo__add');
todoAddBtn.textContent = 'Добавить новую задачу';

const getTodo = () => JSON.parse(localStorage.getItem('pomodoro') || '[]');

// state.activeTodo = {
//   id: 'default',
//   pomodoro: 2,
//   title: 'Помодоро',
// }

// const createTodoListItems = (todo) => {
//   if (todo.id !== 'default') {
//     const todoItem = document.createElement('li');
//     todoItem.classList.add('todo__item');

//     const todoItemWrapper = document.createElement('div');
//     todoItemWrapper.classList.add('todo__item-wrapper');
//     todoItem.append(todoItemWrapper);

//     const todoBtn = document.createElement('button');
//     todoBtn.classList.add('todo__btn');
//     todoBtn.textContent = todo.title;

//     const todoBtnEdit = document.createElement('button');
//     todoBtnEdit.classList.add('todo__edit');
//     todoBtnEdit.ariaLabel = 'Редактировать задачу';

//     const todoBtnDel = document.createElement('button');
//     todoBtnDel.classList.add('todo__del');
//     todoBtnDel.ariaLabel = 'Удалить задачу';

//     todoItemWrapper.append(todoBtn, todoBtnEdit, todoBtnDel);

//     todoListElem.prepend(todoItem);

//     todoBtn.addEventListener('click', () => {
//       if (todo.id === e.target.id) {
//         const todoList = getTodo();

//         state.activeTodo = todo.title;
//       }
//      changeActiveBtn('work');
// stop();
//     })

//     todoBtnEdit.addEventListener('click', () => {
//         todo.title = prompt("Измените название задачи", todo.title);
//         todoBtn.textContext = todo.title;
//       if (todo.id === state.activeTodo.id) {
//         state.activeTodo.title = todo.title;
//       }
//        showTodo();
//        updateTodo(todo);
//     })

//     todoBtnDel.addEventListener('click', (e) => {
//       deleteTodo(todo)
//       if (todo.id === state.activeTodo.id) {
//         state.activeTodo = todoList[todoList.length - 1];
//       }
//        todoItem.remove()
//     })

//   }
// }

const createTodoListItems = (todo) => {
  if (todo.id !== 'default') {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo__item');

    todoItem.innerHTML = `
      <div class="todo__item-wrapper">
        <button class="todo__btn" data-id='${todo.id}'>${todo.title}</button>
        <button class="todo__edit" data-id='${todo.id}' aria-label="Редактировать"></button>
        <button class="todo__del" data-id='${todo.id}' aria-label="Удалить"></button>
      </div>
    `;

    todoListElem.prepend(todoItem);
  }
}

const renderTodoList = (list) => {
  todoListElem.textContent = '';

  list.forEach(createTodoListItems);
  todoListElem.insertAdjacentElement('afterend', todoAddBtn);

  // todoListElem.append(todoItemAdd);
}

export const showTodo = () => {
  if (state.activeTodo) {
    titleElem.textContent = state.activeTodo.title;
    countNumElem.textContent = state.activeTodo.pomodoro;
  } else {
    titleElem.textContent = '';
    countNumElem.textContent = 0;
  }
}

const addTodo = (title) => {
  const todo = {
    title: title,
    pomodoro: 0,
    id: Math.random().toString(16).substring(2, 8),
  };

  const todoList = getTodo();
  todoList.push(todo);

  localStorage.setItem('pomodoro', JSON.stringify(todoList));

  return todo;
}

export const updateTodo = (todo) => {
  const todoList = getTodo();

  if (!todoList.length) {
    return;
  }

  const todoItem = todoList.find(item => item.id === todo.id);

  todoItem.title = todo.title;
  todoItem.pomodoro = todo.pomodoro;

  localStorage.setItem('pomodoro', JSON.stringify(todoList));
}

const editTodo = (id) => {

  const todoList = getTodo();
  todoList.forEach(item => {
    if (item.id === id) {

      const title = prompt("Вы хотите изменить название задачи?", item.title);
      item.title = title;
      if (item.id === state.activeTodo.id) {
        state.activeTodo.title === title;
      }

      updateTodo(item);
      showTodo();
    }
  });

  return todoList;
}

const deleteTodo = (id) => {

  const todoList = getTodo();
  todoList.forEach(item => {
    const newTodoList = todoList.filter(item => item.id !== id);

    if (item.id === id) {

      localStorage.setItem('pomodoro', JSON.stringify(newTodoList));
    }

    if (item.id === state.activeTodo.id) {
      state.activeTodo = newTodoList[newTodoList.length - 1];
    }

    showTodo();

    return newTodoList;
  })
}

const activeTask = (id) => {
  const todoList = getTodo();

  todoList.forEach(item => {
    if (item.id === id) {
      state.activeTodo = item;
      showTodo();
      changeActiveBtn('work');
      stop();
    }
  })
}


export const initTodo = () => {
  const todoList = getTodo();
  const subtitle = document.createElement('p');
  subtitle.textContent = 'Нет задач';

  if (!todoList.length) {
    todoListElem.insertAdjacentElement('beforebegin', subtitle);
    state.activeTodo = {
      id: 'default',
      pomodoro: 0,
      title: 'Нет задач для выполнения!',
    }
  } else {
    state.activeTodo = todoList[todoList.length - 1];
  }

  showTodo();

  renderTodoList(todoList);

  todoListElem.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.todo__btn')) {
      activeTask(target.dataset.id);
    }

    if (target.closest('.todo__edit')) {
      editTodo(target.dataset.id);
    }

    if (target.closest('.todo__del')) {
      deleteTodo(target.dataset.id);
    }

    // if (target.closest('.todo__add')) {
    //   const title = prompt("Введите название задачи", 'Задача')?.trim();
    //   if (title) {
    //     const todo = addTodo(title);
    //     createTodoListItems(todo);
    //     state.activeTodo = todo;
    //     showTodo();
    //     subtitle.remove();
    //   } else {
    //     alert("Введите корректные данные!")
    //   }
    // }
  });

  todoAddBtn.addEventListener('click', () => {
    const title = prompt("Введите название задачи", 'Задача')?.trim();
    if (title) {
      const todo = addTodo(title);
      createTodoListItems(todo);
      showTodo();
      subtitle.remove();
    } else {
      alert("Введите корректные данные!")
    }
  })
}