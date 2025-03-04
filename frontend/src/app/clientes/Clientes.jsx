import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Clientes.css";
import { Link } from "react-router-dom";

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/clientes") // A URL da sua API
        .then((response) => {
            setClientes(response.data);
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
        <div className="clientes-container">
            <Link to="/client-options" className="back-clientes">← Voltar</Link>
            <div className="clientes-container">
                <h2>Clientes Cadastrados</h2>
                {clientes.length > 0 ? (
                    clientes.map(cliente => (
                        <div key={cliente.id_cliente} className="cliente-card">
                            <h3>{cliente.nome_cliente}</h3>
                            <p>Email: {cliente.email_cliente}</p>
                            <p>Telefone: {cliente.tel_cliente}</p>
                        </div>
                    ))
                ) : (
                    <p>Nenhum cliente encontrado.</p>
                )}
            </div>
        </div>
    )
}

export default Clientes;