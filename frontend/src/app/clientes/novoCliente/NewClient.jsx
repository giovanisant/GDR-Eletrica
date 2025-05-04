import { useState } from 'react';
import axios from 'axios';
import styles from './NewClient.module.css';
import { Link } from 'react-router-dom';

const NewClient = () => {
    const [formData, setFormData] = useState({
        nome_cliente: '',
        email_cliente: '',
        tel_cliente: '',
        cpf_cliente: '',
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
            const response = await axios.post('http://127.0.0.1:5000/api/clientes', formData, {
                headers: { 'Content-Type': 'application/json' }
            });

            console.log('Resposta da API:', response.data);
            alert("Cliente cadastrado com sucesso!");

            // Resetando o formulário
            setFormData({
                nome_cliente: '',
                email_cliente: '',
                tel_cliente: '',
                cpf_cliente: '',
            });

        } catch (error) {
            console.error('Erro ao enviar dados:', error.response || error.message);
            setError('Erro ao cadastrar o cliente. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.containerRegistration}>
                <div className={styles.header}>
                    <Link to="/clientes-options" className={styles.backRegistration}>← Voltar</Link>
                </div>
                <div className={styles.clientRegistrationContainer}>
                    <h2>Novo Cliente</h2>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    <form onSubmit={handleSubmit} className={styles.clientRegistrationForm}>
                        <div className={styles.formRow}>
                            <input
                                type="text"
                                name="nome_cliente"
                                placeholder="Nome Completo"
                                value={formData.nome_cliente}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email_cliente"
                                placeholder="E-mail"
                                value={formData.email_cliente}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formRow}>
                            <input
                                type="text"
                                name="tel_cliente"
                                placeholder="Telefone"
                                value={formData.tel_cliente}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formRow}>
                            <input
                                type="number"
                                name="cpf_cliente"
                                placeholder="CPF"
                                value={formData.cpf_cliente}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submitButton} disabled={loading}>
                            {loading ? 'Cadastrando...' : 'Cadastrar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewClient;
