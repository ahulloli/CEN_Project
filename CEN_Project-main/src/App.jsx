import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';
import CreatePage from './views/create.jsx'
import { Profile } from './views/profile.jsx';
import { auth } from './firebase/config.js';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const toMain = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => toMain();
  }, []);

  const handleLogin = () => {
    setUser(auth.currentUser);
    console.log("handled")
  };

  return (
      <Router>
        <Routes>
          <Route path="/" element={user ? <MainPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path ="/profile" element={<Profile />} />
        </Routes>
      </Router>
    );
  }

export default App