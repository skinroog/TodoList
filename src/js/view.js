export default class View {
  constructor() {
    this.app = this.getElement('#app');

    this.title = this.createElement('h1', 'app__title');
    this.title.textContent = 'Todos';

    this.date = this.createElement('p', 'app__date');
    const date = new Date();
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    this.date.textContent = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

    this.form = this.createElement('form', 'form');

    this.input = this.createElement('input', 'form__input');
    this.input.type = 'text';
    this.input.name = 'todo';
    this.input.placeholder = 'Добавить задачу...';

    this.submitButton = this.createElement('button', 'form__submit');

    this.todoList = this.createElement('ul', 'todolist');

    this.form.append(this.input, this.submitButton);

    this.app.append(this.title, this.date, this.form, this.todoList);

    this._temporaryTodoText = '';
    this._initLocalListeners();
  }

  createElement(tagName, className) {
    const element = document.createElement(tagName);
    if (className) element.className = className;

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  get _todoText() {
    return this.input.value;
  }

  _resetInput() {
    this.input.value = '';
  }

  displayTodo(todos) {
    while (this.todoList.firstChild) {
      this.todoList.firstChild.remove();
    }

    if (todos.length === 0) {
      const replaceText = this.createElement('p', 'app__replace-text');
      replaceText.textContent = 'В списке пусто. Желаете добавить задачу?';
      this.todoList.append(replaceText);
    } else {
      todos.forEach(todo => {
        const li = this.createElement('li', 'todolist__item');
        li.id = todo.id;

        const checkbox = this.createElement('input', 'todolist__item-checkbox');
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox${li.id}`;
        checkbox.checked = todo.complete;

        const label = this.createElement('label', 'todolist__item-checkbox-label');
        label.setAttribute('for', `checkbox${li.id}`);

        const span = this.createElement('span', 'todolist__item-text');
        span.textContent = todo.text;
        span.setAttribute('contenteditable', true);

        if (todo.complete) {
          span.classList.add('todolist__item-text--checked');
        }

        const button = this.createElement('button', 'todolist__button-delete');

        li.append(checkbox, label, span, button);

        this.todoList.append(li);
      });
    }
  }

  bindAddTodo(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this._todoText) {
        handler(this._todoText);
        this._resetInput();
      }
    });
  }

  bindDeleteTodo(handler) {
    this.todoList.addEventListener('click', (event) => {
      if (!event.target.matches('.todolist__button-delete')) return;

      const id = +event.target.parentElement.id;
      handler(id);
    });
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener('change', (event) => {
      if (!event.target.matches('.todolist__item-checkbox')) return;

      const id = +event.target.parentElement.id;
      handler(id);
    });
  }

  _initLocalListeners() {
    this.todoList.addEventListener('input', (event) => {
      if (!event.target.matches('.todolist__item-text')) return;

      this._temporaryTodoText = event.target.textContent;
    });
  }

  bindEditTodo = (handler) => {
    this.todoList.addEventListener('focusout', (event) => {
      if (!event.target.matches('.todolist__item-text')) return;

      if (!this._temporaryTodoText) return;

      const id = +event.target.parentElement.id;
      handler(id, this._temporaryTodoText);
      this._temporaryTodoText = '';
    });
  }
}
