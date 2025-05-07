import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AppointmentsOptions.css';
import { Link } from 'react-router-dom';
import Logo from '../../../../public/assets/imagens/logo.png';

const AppointmentsOptions = () => {
    const navigate = useNavigate();

    function navigateToNewClient() {
        navigate('/novo-agendamento');
    }

    function navigateToRegisteredClients() {
        navigate('/agendamentos');
    };

    return (
        <div className="agendamento-options">
            <div className='return-options'>
                <Link to="/home">← Voltar</Link>
            </div>
            <div className="header">
                <img src={Logo} alt="Logo" />
            </div>
            
            <div className='options'>
                <h1>Clientes</h1>
                <button className="option-button" onClick={navigateToNewClient}>Novo Agendamento</button>
                <button className="option-button" onClick={navigateToRegisteredClients}>Agendamentos</button>
            </div>
        </div>
    );
}

export default AppointmentsOptions;