import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './app/dashboard/Dashboard';
import UserOptions from './app/usuarios/userOptions/UserOptions';
import UserRegistration from './app/usuarios/novousuario/UserRegistration';
import RegisteredUsers from './app/usuarios/RegisteredUsers';
import LoginUser from './app/login/LoginUser';
import RedefineUser from './app/usuarios/editarusuario/RedefineUser';
import Clientes from './app/clientes/Clientes';
import ClientesOptions from './app/clientes/clientesOptions/ClientesOptions';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginUser />} />
                <Route path="/redefine" element={<RedefineUser />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/user-options" element={<UserOptions />} />
                <Route path="/users" element={<UserRegistration />} />
                <Route path="/registered-users" element={<RegisteredUsers />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/clientes-options" element={<ClientesOptions />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
