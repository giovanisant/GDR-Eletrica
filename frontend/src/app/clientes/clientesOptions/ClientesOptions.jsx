import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ClientesOptions.css';
import { Link } from 'react-router-dom';
import Logo from '../../../../public/assets/imagens/logo.png';

const ClientesOptions = () => {
    const navigate = useNavigate();

    function navigateToNewClient() {
        navigate('/clientes');
    }

    function navigateToRegisteredClients() {
        navigate('/registered-clients');
    };

    return (
        <div className="clientes-options">
            <div className='return-options'>
                <Link to="/home">← Voltar</Link>
            </div>
            <div className="header">
                <img src={Logo} alt="Logo" />
            </div>
            
            <div className='options'>
                <h1>Clientes</h1>
                <button className="option-button" onClick={navigateToNewClient}>Novo Cliente</button>
                <button className="option-button" onClick={navigateToRegisteredClients}>Cadastrados</button>
            </div>
        </div>
    );
}

export default ClientesOptions;