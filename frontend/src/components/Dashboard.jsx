import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Logo from '../../public/logo.png';

const Dashboard = () => {
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Recupera os dados armazenados no localStorage
        const nome_usuario = localStorage.getItem('nome_usuario');
        const cargo_usuario = localStorage.getItem('cargo_usuario');

        if (nome_usuario && cargo_usuario) {
            setUserName(nome_usuario);
            setUserRole(cargo_usuario);
        } else {
            // Se não encontrar os dados, redirecionar para a tela de login
            // navigate('/login');
        }
    }, []);

    return (
        <div className="dashboard-container">
            <div className="header">
                <img src={Logo} alt="GDG Elétrica Logo" className="logo" />
            </div>
            <Link to="/" className="back-button">← Sair</Link>
            <div className="profile">
                <img src="profile-icon.png" alt="Profile Icon" className="profile-pic" />
                <div className="profile-info">
                    <h3>{userName}</h3>  {/* Exibe o nome do usuário */}
                    <p>{userRole}</p>  {/* Exibe o cargo do usuário */}
                </div>
            </div>
            <div className="button-grid">
                <Link to="/user-options" className="dashboard-button">Usuários</Link>
                <Link to="/clients" className="dashboard-button">Clientes</Link>
                <Link to="/appointments" className="dashboard-button secondary">Agendamentos</Link>
                <Link to="/reports" className="dashboard-button secondary">Relatórios</Link>
                <Link to="/services" className="dashboard-button secondary">Serviços</Link>
                <Link to="/settings" className="dashboard-button secondary">Configurações</Link>
            </div>
        </div>
    );
};

export default Dashboard;