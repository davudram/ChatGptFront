import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Authorization from './Authorization'
import Login from './Login';
import Signup from './Signup';
import ChatPage from './ChatPage';
import AuthAdmin from './AuthAdmin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPanel from './AdminPanel';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/auth' element={<Authorization />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/chat' element={<ChatPage />}></Route>
        <Route path='/authadm' element={<AuthAdmin />}></Route>
        <Route path='/panel' element={<AdminPanel />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
