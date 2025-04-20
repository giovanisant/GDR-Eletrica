import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Clientes.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from '../../components/Loading/index';

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);

    const getClientes = async () => {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:5000/api/clientes") // A URL da sua API
        if(response) {
            setClientes(response.data);
            setLoading(false);
            return
        }
        toast.error('Erro ao carregar os dados');
        setLoading(false);  
    }

    useEffect(() => {
        getClientes();
    },[])

    return (
        <>
        {loading && <Loading />}
        <div className={styles.background}>
            <div className={styles.backClientes}>
                <Link to="/clientes-options">← Voltar</Link>
            </div>
            <h2>Clientes Cadastrados</h2>
            <div className={styles.clientesContainer}>
                {clientes.length > 0 ? (
                    clientes.map(cliente => (
                        <div key={cliente.id_cliente} className={styles.clienteCard}>
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
        </>
    )
}

export default Clientes;