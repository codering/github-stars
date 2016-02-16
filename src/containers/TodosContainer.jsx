import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Todos/Header';
import MainSection from '../components/Todos/MainSection';
import * as TodoActions from '../actions/todos';

class TodosContainer extends Component {
  render() {
    const { todos } = this.props;
    const actions = bindActionCreators(TodoActions, this.props.dispatch);
    return (<div>
      <Header addTodo={actions.addTodo} />
      <MainSection todos={todos} actions={actions} />
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

export default connect(mapStateToProps)(TodosContainer);
