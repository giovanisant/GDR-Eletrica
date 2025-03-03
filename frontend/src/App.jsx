import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './app/dashboard/Dashboard';
import UserOptions from './app/configuracoes/UserOptions';
import UserRegistration from './app/usuarios/novousuario/UserRegistration';
import RegisteredUsers from './app/usuarios/RegisteredUsers';
import LoginUser from './app/login/LoginUser';
import RedefineUser from './app/usuarios/editarusuario/RedefineUser';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginUser />} />
                <Route path="/redefine" element={<RedefineUser />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/user-options" element={<UserOptions />} />
                <Route path="/users" element={<UserRegistration />} />
                <Route path="/registered-users" element={<RegisteredUsers />} />
            </Routes>
        </Router>
    );
};

export default App;
