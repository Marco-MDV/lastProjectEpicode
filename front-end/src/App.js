import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Main from './components/main/Main';
import { useState } from 'react';
import ErrorPage from './routes/errorPage/ErrorPage';
import TriggerNav from './components/triggerNav/TriggerNav';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Login from './routes/login/Login';
import Register from './routes/register/Register';
import Profile from './routes/profile/Profile';
import News from './routes/news/News';
import HistoryPage from './routes/history/HistoryPage';

function App() {
  const [see, setSee] = useState(false);
    const seeNav = () => {
    setSee(!see);
  };

  window.addEventListener("beforeunload", (event) => {
    localStorage.removeItem('newToken');
    localStorage.removeItem('token: ');   
  });

  const handleLogin = (newToken) => {
    localStorage.setItem('newToken', newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('newToken');
    localStorage.removeItem('token: ')
  };


  return (
    <Provider store={store}>
      <Router>
        <TriggerNav seeNav={seeNav} />
        <Navbar handleLogout={handleLogout} /> 
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/news' element={<News/>} />
          <Route path='/login' element={<Login onLogin={handleLogin} />} /> 
          <Route path='/register' element={<Register onRegister={handleLogin} />} /> 
          <Route path='/profile/:token' element={<Profile handleLogin={handleLogin}/>} />
          <Route path='/profile/history/:cardId' element={<HistoryPage/>}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
