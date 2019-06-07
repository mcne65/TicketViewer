import React from 'react';
import './App.css';
import { LoginPage } from './components/LoginPage/LoginPage.ui'
import { Header } from './components/Header/Header.ui'
const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <LoginPage />
    </div>
  );
}

export default App;
