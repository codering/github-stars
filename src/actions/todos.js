import { createAction } from 'redux-actions';
import * as TodosAPI from '../api/todos';

export const loadTodos = createAction('load todos', TodosAPI.loadTodos);
export const addTodo = createAction('add todo', TodosAPI.addTodo);
export const deleteTodo = createAction('delete todo', TodosAPI.deleteTodo);
export const editTodo = createAction('edit todo', TodosAPI.editTodo);
export const completeTodo = createAction('complete todo', TodosAPI.completeTodo);
export const completeAll = createAction('complete all');
export const clearCompleted = createAction('clear complete');
