# app/routes/usuario_routes.py
from flask import Blueprint, request, jsonify
# from werkzeug.security import check_password_hash, generate_password_hash
from app.models.usuario_model import Usuario, db

usuario_bp = Blueprint('usuario_bp', __name__)

# Rota para login do usuário
@usuario_bp.route('/api/login', methods=['POST'])
def login_usuario():
    try:
        dados = request.get_json()
        email = dados.get('email_usuario')
        senha = dados.get('senha_usuario')

        if not email or not senha:
            return jsonify({"message": "Email e senha são obrigatórios!"}), 400

        usuario = Usuario.query.filter_by(email_usuario=email).first()
        if not usuario:
            return jsonify({"message": "Usuário não encontrado!"}), 404

        # if not check_password_hash(usuario.senha_usuario, senha):  # Verificação de senha
            return jsonify({"message": "Senha incorreta!"}), 401

        return jsonify({
            "message": "Login bem-sucedido",
            "nome_usuario": usuario.nome_usuario,
            "cargo_usuario": usuario.cargo_usuario,
        }), 200

    except Exception as e:
        return jsonify({"message": f"Erro ao realizar login: {str(e)}"}), 500


# Rota GET para listar todos os usuários
@usuario_bp.route('/api/usuarios', methods=['GET'])
def listar_usuarios():
    try:
        usuarios = Usuario.query.all()
        if not usuarios:
            return jsonify({"message": "Nenhum usuário encontrado"}), 404
        usuarios_json = [usuario.to_dict() for usuario in usuarios]
        return jsonify(usuarios_json), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao listar os usuários: {str(e)}"}), 500


# Rota para criar um novo usuário
@usuario_bp.route('/api/usuarios', methods=['POST'])
def criar_usuario():
    try:
        dados = request.get_json()

        if not all(dados.get(campo) for campo in ["nome_usuario", "email_usuario", "tel_usuario", "senha_usuario", "cargo_usuario", "cpf_usuario", "tipo_usuario"]):
            return jsonify({"message": "Dados inválidos ou em formato incorreto"}), 400

        senha_hash = generate_password_hash(dados['senha_usuario'])

        novo_usuario = Usuario(
            nome_usuario=dados['nome_usuario'],
            email_usuario=dados['email_usuario'],
            tel_usuario=dados['tel_usuario'],
            senha_usuario=senha_hash,
            cargo_usuario=dados['cargo_usuario'],
            cpf_usuario=dados['cpf_usuario'],
            tipo_usuario=dados['tipo_usuario']
        )

        db.session.add(novo_usuario)
        db.session.commit()
        return jsonify({"message": "Usuário cadastrado com sucesso!"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Erro ao cadastrar o usuário: {str(e)}"}), 400
