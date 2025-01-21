import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import api from './services/api';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getUsers()
      .then((data) => setUsers(data))
      .catch((err) => setError('Failed to fetch users'));
  }, []);

  const addUser = (user) => {
    api
      .addUser(user)
      .then((newUser) => setUsers([...users, newUser]))
      .catch(() => setError('Failed to add user'));
  };

  const updateUser = (updatedUser) => {
    api
      .updateUser(updatedUser)
      .then(() => {
        setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
        setEditingUser(null);
      })
      .catch(() => setError('Failed to update user'));
  };

  const deleteUser = (id) => {
    api
      .deleteUser(id)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch(() => setError('Failed to delete user'));
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      {error && <p className="error">{error}</p>}
      <UserList users={users} onEdit={setEditingUser} onDelete={deleteUser} />
      <UserForm
        onSubmit={editingUser ? updateUser : addUser}
        editingUser={editingUser}
        onCancel={() => setEditingUser(null)}
      />
    </div>
  );
};

export default app;

import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => (
  <div className="user-list">
    {users.map((user) => (
      <div key={user.id} className="user-card">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Department:</strong> {user.department}</p>
        <button onClick={() => onEdit(user)}>Edit</button>
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    ))}
  </div>
);

export default UserList;

import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, editingUser, onCancel }) => {
  const [user, setUser] = useState({ name: '', email: '', department: '' });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
    setUser({ name: '', email: '', department: '' });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
      <input
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        required
      />
      <input
        name="department"
        value={user.department}
        onChange={handleChange}
        placeholder="Department"
        required
      />
      <button type="submit">Save</button>
      {editingUser && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default UserForm;