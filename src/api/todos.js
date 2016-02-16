import reqwest from '@alipay/ajax';

export async function loadTodos() {
  return await reqwest({url: '/api/todos?_sort=id&_order=DESC', type: 'json'});
}

export async function addTodo(text) {
  const data = { text };
  return await reqwest({url: '/api/todos', type: 'json', method: 'POST', data});
}

export async function deleteTodo(id) {
  await reqwest({url: `/api/todos/${id}`, type: 'json', method: 'DELETE'});
  return id;
}

export async function editTodo({ id, text }) {
  const data = { text };
  return await reqwest({url: `/api/todos/${id}`, type: 'json', method: 'PATCH', data});
}

export async function completeTodo({ id, completed }) {
  const data = { completed };
  return await reqwest({url: `/api/todos/${id}`, type: 'json', method: 'PATCH', data});
}
