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
import NewClient from './app/clientes/novoCliente/NewClient';
import AppointmentsOptions from './app/agendamentos/appointmentsOptions/AppointmentsOptions';
import Appointments from './app/agendamentos/Appointments';
import NewAppointment from './app/agendamentos/novoAgendamento/NewAppointment';
import Service from './app/servicos/services';

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
                <Route path="/clientes-options" element={<ClientesOptions />} />
                <Route path="/clientes" element={<Clientes />} /> 
                <Route path="/novo-cliente" element={<NewClient />} />
                <Route path="/agendamentos-options" element={<AppointmentsOptions />} />
                <Route path="/agendamentos" element={<Appointments />} />
                <Route path="/novo-agendamento" element={<NewAppointment />} />
                <Route path="/servicos" element={<Service />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
