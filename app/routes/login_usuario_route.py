from app import app
from flask import request, jsonify
from app.models.usuario import Usuario

#com teste

# Rota para login do usuário
@app.route('/api/login', methods=['POST'])
def login_usuario():
    try:
        dados = request.get_json()  # Recebe os dados do corpo da requisição
        email = dados.get('email_usuario')
        senha = dados.get('senha_usuario')

        # Verifica se o email e a senha foram fornecidos
        if not email or not senha:
            return jsonify({"message": "Email e senha são obrigatórios!"}), 400

        # Consulta o banco de dados para encontrar o usuário com o email fornecido
        usuario = Usuario.query.filter_by(email_usuario=email).first()

        # Verifica se o usuário foi encontrado
        if not usuario:
            return jsonify({"message": "Usuário não encontrado!"}), 404

        # Verifica se a senha fornecida corresponde à senha armazenada no banco
        # Aqui usamos check_password_hash apenas se a senha estiver hashada
        if usuario.senha_usuario != senha:  # Substitua por check_password_hash caso utilize hashing
            return jsonify({"message": "Senha incorreta!"}), 401

        # Aqui você pode gerar um token JWT para autenticação, por exemplo
        # Fornecerei apenas uma resposta simples por agora
        return jsonify({
                "message": "Login bem-sucedido",
                "nome_usuario": usuario.nome_usuario,
                "cargo_usuario": usuario.cargo_usuario,
            }), 200

    except Exception as e:
        return jsonify({"message": f"Erro ao realizar login: {str(e)}"}), 500