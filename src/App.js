import React from 'react';
import UserForm from './components/UserForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 data-testid="app-title">Form2 App</h1>
      <UserForm />
    </div>
  );
}

export default App;