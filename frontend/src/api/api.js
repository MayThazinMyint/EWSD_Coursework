// api.js

import axios from 'axios';

export const fetchTodos = () => {
  return axios.get('/api/todos');
};

export const addTodo = (text) => {
  return axios.post('/api/todos', { text });
};
