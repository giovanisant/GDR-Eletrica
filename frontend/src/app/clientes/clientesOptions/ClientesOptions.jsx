import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ClientesOptions.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../../../public/assets/imagens/logo.png';

const ClientesOptions = () => {
    const navigate = useNavigate();

    function navigateToNewClient() {
        navigate('/novo-cliente');
    }

    function navigateToRegisteredClients() {
        navigate('/clientes');
    };

    return (
        <div className={styles.background}>
            <div className={styles.clientesOptions}>
                <div className={styles.returnOptions}>
                    <Link to="/home">← Voltar</Link>
                </div>
                <div className={styles.header}>
                    <img src={Logo} alt="Logo" className={styles.img} />
                </div>
                <div className={styles.options}>
                    <h1>Clientes</h1>
                    <div className={styles.optionButton} onClick={navigateToNewClient}>Novo Cliente</div>
                    <div className={styles.optionButton} onClick={navigateToRegisteredClients}>Cadastrados</div>
                </div>
            </div>
        </div>
    );
}

export default ClientesOptions;