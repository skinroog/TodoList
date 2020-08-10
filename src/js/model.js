export default class Model {
  constructor() {
    this.todos = [
      { id: 1, text: 'Прочитать 30 страниц', complete: false },
      { id: 2, text: 'Убраться в комнате', complete: false },
    ];
  }

  addTodo(todoText) {
    const todo = {
      id: this.todos.length === 0 ? 1 : this.todos[this.todos.length - 1].id + 1,
      text: todoText,
      complete: false,
    };

    this.todos.push(todo);
  }

  editTodo(id, updatedText) {
    this.todos.forEach(todo => {
      if (todo.id === id) todo.text = updatedText;
    });
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleTodo(id) {
    this.todos.forEach(todo => {
      if (todo.id === id) todo.complete = !todo.complete;
    });
  }
}
