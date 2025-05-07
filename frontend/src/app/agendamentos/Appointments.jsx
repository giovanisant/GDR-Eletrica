import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Appointments.css";
import { Link } from "react-router-dom";

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/agendamentos") // A URL da sua API
        .then((response) => {
            setAppointments(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError('Erro ao carregar os dados');
            setLoading(false);  
        })
    }, [])

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="agendamentos-container">
            <Link to="/agendamentos-options" className="back-agendamentos">← Voltar</Link>
            <div className="agendamento-container">
                <h2>Agendamentos</h2>
                {agendamentos.length > 0 ? (
                    agendamentos.map(agendamento => (
                        <div key={agendamento.id_agendamento} className="agendamento-card">
                            <h3>`{agendamento.id_agendamento}    {agendamento.nome_cliente}`</h3>
                            <p>`{agendamento.status}    {agendamento.data}`</p>
                            <p>{agendamento.decricao}</p>
                        </div>
                    ))
                ) : (
                    <p>Nenhum agendamento encontrado.</p>
                )}
            </div>
        </div>
    )
}

export default Appointments;