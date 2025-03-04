from app.app_factory import create_app
from flask import request, jsonify, Blueprint
from app.models.usuario_model import Usuario
from app.app_factory import db
from backend.app.models.cliente_model import Cliente

app = create_app()
bp = Blueprint('cliente', __name__)

@app.route('/api/clientes', methods=['POST']) # Rota para criar um cliente
def criar_cliente():
    try:
        dados = request.get_json() # Recebe os dados do corpo da requisição
        
        if not all(dados.get(campo) for campo in ["nome_cliente", "email_cliente", "tel_cliente", "cpf_cliente"]): # Verifica se todos os campos foram fornecidos
            return jsonify({"message": "Dados incompletos"}), 400
        
        nome_cliente = dados.get('nome_cliente')
        email_cliente = dados.get('email_cliente')
        tel_cliente = dados.get('tel_cliente')
        cpf_cliente = dados.get('cpf_cliente')

        # Verifica se o cliente já existe no banco de dados
        if Cliente.query.filter_by(cpf_cliente=cpf_cliente).first():
            return jsonify({"message": "Cliente já cadastrado"}), 409
        
        # Cria um novo objeto Cliente
        novo_cliente = Cliente(
            nome_cliente=nome_cliente, 
            email_cliente=email_cliente, 
            tel_cliente=tel_cliente, 
            cpf_cliente=cpf_cliente
        ) 
        db.session.add(novo_cliente) # Adiciona o novo cliente ao banco de dados
        
        return jsonify({"message": "Cliente criado com sucesso"}), 201
    
    except Exception as e:
        db.session.rollback() # Desfaz qualquer alteração no banco de dados
        return jsonify({"message": f"Erro ao criar cliente: {str(e)}"}), 500