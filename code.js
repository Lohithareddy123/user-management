import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

const updateUser = async (user) => {
  const response = await axios.put(`${API_URL}/${user.id}`, user);
  return response.data;
};

const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export default { getUsers, addUser, updateUser, deleteUser };