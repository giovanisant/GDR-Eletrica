import { useState } from 'react';
import axios from 'axios';
import './NewAppointment.css';
import { Link } from 'react-router-dom';

const NewAppointment = () => {
    const [formData, setFormData] = useState({
        nome_cliente: '',
        horario: '',
        endereco: '',
        descricao: '',
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
            const response = await axios.post('http://127.0.0.1:5000/agendamentos', formData, {
                headers: { 'Content-Type': 'application/json' }
            });

            console.log('Resposta da API:', response.data);
            alert("Agendamento cadastrado com sucesso!");

            // Resetando o formulário
            setFormData({
                nome_cliente: '',
                horario: '',
                endereco: '',
                descricao: '',
            });

        } catch (error) {
            console.error('Erro ao enviar dados:', error.response || error.message);
            setError('Erro ao registrar orçamento. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container-registration'>
            <Link to="/agendamentos-options" className="back-registration">← Voltar</Link>
            <div className="agendamento-registration-container">
                <h2>Novo Agendamento</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="agendamento-registration-form">
                    <div className="form-row">
                        <input
                            type="text"
                            name="nome_cliente"
                            placeholder="Nome Completo"
                            value={formData.nome_cliente}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="horario"
                            placeholder="Horario"
                            value={formData.horario}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <input
                            type="text"
                            name="endereco"
                            placeholder="Endereço"
                            value={formData.endereco}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row-description">
                        <input
                            type="text"
                            name="descricao"
                            placeholder="Descrição"
                            value={formData.descricao}
                            onChange={handleChange}
                            required
                            wrap="hard"
                            rows="5"
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewAppointment;
