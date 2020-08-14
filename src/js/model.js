export default class Model {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  }

  addTodo(todoText) {
    const todo = {
      id: this.todos.length === 0 ? 1 : this.todos[this.todos.length - 1].id + 1,
      text: todoText,
      complete: false,
    };

    this.todos.push(todo);

    this._commit(this.todos);
  }

  editTodo(id, updatedText) {
    this.todos.forEach((todo) => {
      if (todo.id === id) todo.text = updatedText;
    });

    this._commit(this.todos);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);

    this._commit(this.todos);
  }

  toggleTodo(id) {
    this.todos.forEach((todo) => {
      if (todo.id === id) todo.complete = !todo.complete;
    });

    this._commit(this.todos);
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  _commit(todos) {
    this.onTodoListChanged(this.todos);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
