import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Logo from '../../../public/assets/imagens/logo.png';
import Profile from '../../../public/assets/imagens/profile-icon.png';

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
        <div className={styles.background}>
            <div className={styles.dashboardContainer}>
                <div className={styles.header}>
                    <Link to="/" className={styles.backButton}>← Sair</Link>
                    <img src={Logo} alt="GDG Elétrica Logo" className={styles.logo} />
                </div>
                
                <div className={styles.profile}>
                    <img src={Profile} alt="Profile Icon" className={styles.profilePic} />
                    <div className={styles.profileInfo}>
                        <h3>{userName}</h3>  {/* Exibe o nome do usuário */}
                        <p>{userRole}</p>  {/* Exibe o cargo do usuário */}
                    </div>
                </div>
                <div className={styles.buttonGrid}>
                    <Link to="/user-options" className={styles.dashboardButton}>Usuários</Link>
                    <Link to="/clientes-options" className={styles.dashboardButton}>Clientes</Link>
                    <Link to="/agendamentos-options" className={styles.dashboardButton}>Agendamentos</Link>
                    <Link to="/reports" className={styles.dashboardButton}>Relatórios</Link>
                    <Link to="/servicos" className={styles.dashboardButton}>Serviços</Link>
                    <Link to="/settings" className={styles.dashboardButton}>Configurações</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;