import React from 'react'
import { useNavigate } from 'react-router-dom';
import './UserOptions.css';
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
        <div className="user-options">
            <div className='return-options'>
                <Link to="/home">←
                Voltar</Link>
            </div>
            <div className="header">
                <img src={Logo} alt="Logo" />
            </div>
            
            <div className='options'>
                <h1>Usuários</h1>
                <button className="option-button" onClick={navigateToNewUser}>Novo Usuário</button>
                <button className="option-button" onClick={navigateToRegisteredUsers}>Cadastrados</button>
            </div>
        </div>
    );
};

export default UserOptions;