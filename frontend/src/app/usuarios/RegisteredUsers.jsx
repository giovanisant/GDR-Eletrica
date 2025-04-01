// src/components/RegisteredUsers.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './RegisteredUsers.module.css'; // Se você tiver um arquivo de estilo CSS
import { Link } from 'react-router-dom';

function RegisteredUsers() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true); // Para controlar o carregamento
    const [error, setError] = useState(null); // Para capturar erros

    // UseEffect para fazer a requisição GET quando o componente for montado
    useEffect(() => {
        // A URL da sua API
         axios.get('http://127.0.0.1:5000/api/usuarios')
            .then(response => {
                setUsuarios(response.data);  // Atualiza o estado com os dados dos usuários
                setLoading(false);  // Fim do carregamento
            })
            .catch(error => {
                setError('Erro ao carregar os dados'); // Captura erro de requisição
                setLoading(false);  // Fim do carregamento
            });
    }, []);  // O array vazio garante que isso só será executado uma vez quando o componente for montado

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
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
    );
}

export default RegisteredUsers;
