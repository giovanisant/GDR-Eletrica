// src/components/RegisteredUsers.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './RegisteredUsers.module.css'; // Se você tiver um arquivo de estilo CSS
import { Link } from 'react-router-dom';
import { Loading } from '../../components/Loading/index';
import { toast } from 'react-toastify';

function RegisteredUsers() {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null); // Para capturar erros
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setLoading(true); // Inicia o carregamento
        const response = await axios.get('http://127.0.0.1:5000/api/usuarios')
        if(!response) {
            toast.error('Erro ao carregar os dados'); // Exibe mensagem de erro
            setLoading(false);
            return
        }
        setUsuarios(response.data); // Atualiza o estado com os dados dos usuários
        setLoading(false); 
    }

    useEffect(() => {
        getUsers(); // Chama a função para obter os usuários
    }, []);

    return (
        <>
            {loading && <Loading />}
            <div className={styles.registeredContainer}>
                <div className={styles.backRegistered}>
                    <Link to="/user-options" >← Voltar</Link>
                </div>
                    <h2>Usuários Cadastrados</h2>
                <div className={styles.container}>
                    <div className={styles.registeredUsersContainer}>
                        {usuarios.length > 0 ? (
                            usuarios.map(usuario => (
                                <div key={usuario.id_usuario} className={styles.usuarioCard}>
                                    <h3>{usuario.nome_usuario}</h3>
                                    <p>Email: {usuario.email_usuario}</p>
                                    <p>Cargo: {usuario.cargo_usuario}</p>
                                    <p>Telefone: {usuario.tel_usuario}</p>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum usuário encontrado.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisteredUsers;
