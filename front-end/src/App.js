import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Main from './components/main/Main';
import { useEffect, useState } from 'react';
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
  const [token, setToken] = useState(null);

  const seeNav = () => {
    setSee(!see);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token: ');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('newToken', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('newToken');
  };

  


  return (
    <Provider store={store}>
      <Router>
        <TriggerNav seeNav={seeNav} />
        <Navbar token={token} handleLogout={handleLogout} /> 
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path='/news' element={<News/>} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} /> 
          <Route path="/register" element={<Register onRegister={handleLogin} />} /> 
          <Route path='/profile/:token' element={<Profile handleLogin={handleLogin}/>} />
          <Route path='/profile/history/:cardId' element={<HistoryPage/>}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
