import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginUser.css';
import Logo from '../../../public/assets/imagens/logo.png';
import { Link } from 'react-router-dom';

const LoginUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            // Envia a requisição POST para a API de login
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email_usuario: email, senha_usuario: password }),
            });
    
            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Erro ao tentar realizar login');
            }
    
            // Se a autenticação for bem-sucedida
            const data = await response.json();
    
            // Armazenar o nome e o cargo do usuário no sessionStorage ou localStorage
            localStorage.setItem('nome_usuario', data.nome_usuario);
            localStorage.setItem('cargo_usuario', data.cargo_usuario);
    
            // Redireciona para a página inicial ou home
            navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit} className="form-login">
                <h1>Login</h1>
                <div className="user-login">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Senha"
                    />
                    <Link to="/redefine" className="link">
                        Esqueci a senha
                    </Link>
                </div>

                <div className="button-login">
                    <button type="submit">Entrar</button>
                </div>
                {error && <p className="error">{error}</p>} {/* Exibe erro caso haja */}
            </form>
            <div className="img">
                <img src={Logo} alt="Logo" />
            </div>
        </div>
    );
};

export default LoginUser;