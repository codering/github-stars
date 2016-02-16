import React, { Component } from 'react';
import TodoTextInput from './TodoTextInput';

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
    };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo({ id, text });
    }
    this.setState({ editing: false });
  }

  render() {
    const {todo, completeTodo, deleteTodo} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
           editing={this.state.editing}
           onSave={(text) => this.handleSave(todo.id, text)} />
      );
    } else {
      element = (
        <div>
          <input
             type="checkbox"
             checked={todo.completed}
             onChange={() => completeTodo({id: todo.id, completed: !todo.completed})} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.text}
          </label>
          <button onClick={() => deleteTodo(todo.id)} />
        </div>
      );
    }

    return (
      <li>
        {element}
      </li>
    );
  }
}

export default TodoItem;