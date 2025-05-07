# app/routes/cliente_routes.py
from flask import Blueprint, Response, request, jsonify
from app.models.cliente_model import Cliente, db

cliente_bp = Blueprint('cliente_bp', __name__)

# Rota para criar um cliente
@cliente_bp.route('/api/clientes', methods=['POST'])
def criar_cliente():
    try:
        dados = request.get_json()

        if not all(dados.get(campo) for campo in ["nome_cliente", "email_cliente", "tel_cliente", "cpf_cliente"]):
            return jsonify({"message": "Dados inválidos ou em formato incorreto"}), 400

        novo_cliente = Cliente(
            nome_cliente=dados['nome_cliente'],
            email_cliente=dados['email_cliente'],
            tel_cliente=dados['tel_cliente'],
            cpf_cliente=dados['cpf_cliente']
        )

        db.session.add(novo_cliente)
        db.session.commit()
        return jsonify({"message": "Cliente cadastrado com sucesso!"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Erro ao cadastrar o Cliente: {str(e)}"}), 400


# Rota para listar todos os clientes
@cliente_bp.route('/api/clientes', methods=['GET'])
def listar_clientes():
    try:
        clientes = Cliente.query.all()
        if not clientes:
            return Response({"Error": "Nenhum cliente encontrado"}, status=404)
        clientes_json = [cliente.to_dict() for cliente in clientes]
        return jsonify(clientes_json), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao listar os clientes: {str(e)}"}), 500
