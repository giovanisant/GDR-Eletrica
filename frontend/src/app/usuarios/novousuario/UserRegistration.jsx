import { useState } from 'react';
import axios from 'axios';
import './UserRegistration.css';
import { Link } from 'react-router-dom';

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        nome_usuario: '',
        email_usuario: '',
        tel_usuario: '',
        senha_usuario: '',
        cargo_usuario: '',
        cpf_usuario: '',
        tipo_usuario: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (let key in formData) {
            if (!formData[key]) {
                alert("Por favor, preencha todos os campos.");
                return;
            }
        }

        console.log('Dados a serem enviados:', formData);

        setLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/usuarios', formData, {
                headers: { 'Content-Type': 'application/json' }
            });

            console.log('Resposta da API:', response.data);
            alert("Usuário cadastrado com sucesso!");

            // Resetando o formulário
            setFormData({
                nome_usuario: '',
                email_usuario: '',
                tel_usuario: '',
                senha_usuario: '',
                cargo_usuario: '',
                cpf_usuario: '',
                tipo_usuario: '',
            });

        } catch (error) {
            console.error('Erro ao enviar dados:', error.response || error.message);
            setError('Erro ao cadastrar o usuário. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container-registration'>
            <Link to="/user-options" className="back-registration">← Voltar</Link>
            <div className="user-registration-container">
                <h2>Novo Usuário</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="user-registration-form">
                    <div className="form-row">
                        <input
                            type="text"
                            name="nome_usuario"
                            placeholder="Nome Completo"
                            value={formData.nome_usuario}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email_usuario"
                            placeholder="E-mail"
                            value={formData.email_usuario}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <input
                            type="text"
                            name="tel_usuario"
                            placeholder="Telefone"
                            value={formData.tel_usuario}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="senha_usuario"
                            placeholder="Senha"
                            value={formData.senha_usuario}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <select
                            name="cargo_usuario"
                            value={formData.cargo_usuario}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Cargo</option>
                            <option value="admin">Administrador</option>
                            <option value="colab">Eletricista</option>
                        </select>
                        <input
                            type="number"
                            name="cpf_usuario"
                            placeholder="CPF"
                            value={formData.cpf_usuario}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <select
                            name="tipo_usuario"
                            value={formData.tipo_usuario}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Tipo de Usuário</option>
                            <option value="adm">Adm</option>
                            <option value="usr">Usuario</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserRegistration;
