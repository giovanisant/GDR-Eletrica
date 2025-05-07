// src/services/api.js
const api = "http://127.0.0.1:5000/api/usuarios";  // Endpoint do backend Flask

export const cadastrarUsuario = async (dados) => {
    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
    }
};
