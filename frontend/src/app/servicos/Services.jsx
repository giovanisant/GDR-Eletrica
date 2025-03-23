import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Service.css";
import { Link } from "react-router-dom";

function Service() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/servicos") // A URL da sua API
        .then((response) => {
            setServices(response.data);
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
        <div className="servicos-container">
            <Link to="/home" className="back-servicos">← Voltar</Link>
            <div className="servicos-container">
                <h2>Serviços</h2>
                {services.length > 0 ? (
                    services.map(servico => (
                        <div key={servico.id_servico} className="servico-card">
                            <h3>{servico.nome_servico}</h3>
                        </div>
                    ))
                ) : (
                    <p>Nenhum serviço encontrado.</p>
                )}
            </div>
        </div>
    )
}

export default Service;