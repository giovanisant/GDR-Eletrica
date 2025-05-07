import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './UserOptions.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../../../public/assets/imagens/logo.png';

const UserOptions = () => {
    const navigate = useNavigate();

    function navigateToNewUser() {
        navigate('/users'); // Ajuste a rota para "/users" se for a página de registro
    }

    function navigateToRegisteredUsers() {
        navigate('/registered-users');
    };

    return (
        <div className={styles.background}>
            <div className={styles.userOptions}>
                <div className={styles.returnOptions}>
                    <Link to="/home">←
                    Voltar</Link>
                </div>
                <div className={styles.header}>
                    <img src={Logo} alt="Logo" className={styles.img}/>
                </div>
            
                <div className={styles.options}>
                    <h1>Usuários</h1>
                    <div className={styles.optionButton} onClick={navigateToNewUser}>Novo Usuário</div>
                    <div className={styles.optionButton} onClick={navigateToRegisteredUsers}>Cadastrados</div>
                </div>
            </div>
        </div>
    );
};

export default UserOptions;