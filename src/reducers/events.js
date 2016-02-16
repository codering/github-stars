import { handleActions } from 'redux-actions';

const initialState = {

};

export default handleActions({
  'load events' (state, action) {
    if (action.sequence.type === 'start') return state;
    return action.payload;
  },

  'add todo' (state, action) {
    if (action.sequence.type === 'start') return state;
    return [action.payload, ...state];
  },

  'delete todo' (state, action) {
    if (action.sequence.type === 'start') return state;
    return state.filter(todo => todo.id !== action.payload);
  },

  'edit todo' (state, action) {
    if (action.sequence.type === 'start') return state;
    return state.map(todo => {
      console.log(todo.id === action.payload.id);
      return todo.id === action.payload.id
        ? action.payload
        : todo;
    });
  },

  'complete todo' (state, action) {
    if (action.sequence.type === 'start') return state;
    return state.map(todo => {
      return todo.id === action.payload.id
        ? action.payload
        : todo;
    });
  },

  'complete all' (state, action) {
    const areAllMarked = state.every(todo => todo.completed);
    return state.map(todo => {
      return {
        ...todo,
        completed: !areAllMarked
      };
    });
  },

  'clear complete' (state, action) {
    return state.filter(todo => todo.completed === false);
  },

}, initialState);
