import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './views/LoginPage.jsx';
import MainPage from './views/MainPage.jsx';
import CreatePage from './views/create.jsx'
import { Profile } from './views/profile.jsx';
import { auth } from './firebase/config.js';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {  //useEffect hook listens for firebase authentication state change
    const toMain = auth.onAuthStateChanged((user) => {
      setUser(user); //makes it so user can be routed to other pages once succesfully logged in
    });

    return () => toMain();
  }, []);
  
  return (
    //routing configuration
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={user ? <MainPage /> : <Navigate to="/login" />} />
        <Route path="/create" element={user ? <CreatePage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;