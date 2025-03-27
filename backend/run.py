from flask import Flask, request, jsonify
from flask_cors import CORS
# from app.config import DATABASE_URI
from app.models.usuario_model import Usuario, db
from werkzeug.security import check_password_hash  # Importa para verificação de senha
from app.app_factory import create_app
from app.models.cliente_model import Cliente


# app = Flask(__name__)


# # Configuração do banco de dados
# app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# # Inicializando o banco de dados
# db.init_app(app)

# # Habilitar CORS para o frontend no localhost:5173
# CORS(app, origins=["http://localhost:5173"], allow_headers=["Content-Type", "Authorization"])
app = create_app()



@app.route('/')
def home():
    return 'Bem-vindo à API!'

#Rota para login do usuário
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


# Rota GET para listar todos os usuários
@app.route('/api/usuarios', methods=['GET'])
def listar_usuarios():
    try:
        usuarios = Usuario.query.all()  # Consulta todos os usuários
        if not usuarios:
            return jsonify({"message": "Nenhum usuário encontrado"}), 404
        usuarios_json = [usuario.to_dict() for usuario in usuarios]  # Usando o método to_dict
        return jsonify(usuarios_json), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao listar os usuários: {str(e)}"}), 500

# Rota para criar um novo usuário
# Arquivo da API

@app.route('/api/usuarios', methods=['POST'])
def criar_usuario():
    try:
        dados = request.get_json()
        print('Dados recebidos:', dados)

        if not all(dados.get(campo) for campo in ["nome_usuario", "email_usuario", "tel_usuario", "senha_usuario", "cargo_usuario", "cpf_usuario", "tipo_usuario"]):
            print("Campos obrigatórios ausentes")
            return jsonify({"message": "Dados inválidos ou em formato incorreto"}), 400

        # Extraindo dados na ordem do banco de dados
        nome_usuario = dados.get('nome_usuario')
        email_usuario = dados.get('email_usuario')
        tel_usuario = dados.get('tel_usuario')
        senha_usuario = dados.get('senha_usuario')
        cargo_usuario = dados.get('cargo_usuario')
        cpf_usuario = dados.get('cpf_usuario')
        tipo_usuario = dados.get('tipo_usuario')

        # Validação dos campos obrigatórios
        if not nome_usuario or not email_usuario or not tel_usuario or not senha_usuario or not cargo_usuario or not cpf_usuario or not tipo_usuario:
            return jsonify({"message": "Todos os campos são obrigatórios!"}), 400

        # Criando nova instância de Usuario
        novo_usuario = Usuario(
            nome_usuario=dados['nome_usuario'],
            email_usuario=dados.get('email_usuario'),
            tel_usuario=dados.get('tel_usuario'),
            senha_usuario=dados['senha_usuario'],
            cargo_usuario=dados['cargo_usuario'],
            cpf_usuario=dados.get('cpf_usuario'),
            tipo_usuario=dados['tipo_usuario']
        )

        # Salvando o novo usuário no banco de dados
        print("Adicionando ao banco de dados...")
        db.session.add(novo_usuario)
        db.session.commit()
        print("Usuário salvo com sucesso!")

        return jsonify({"message": "Usuário cadastrado com sucesso!"}), 201

    except Exception as e:
        db.session.rollback()
        print(f"Erro ao salvar no banco de dados: {str(e)}")
        return jsonify({"message": f"Erro ao cadastrar o usuário: {str(e)}"}), 400
    
@app.route('/api/clientes', methods=['POST'])
def criar_cliente():
    try:
        dados = request.get_json()
        print('Dados recebidos:', dados)

        if not all(dados.get(campo) for campo in ["nome_cliente", "email_cliente", "tel_cliente", "cpf_cliente"]):
            print("Campos obrigatórios ausentes")
            return jsonify({"message": "Dados inválidos ou em formato incorreto"}), 400

        # Extraindo dados na ordem do banco de dados
        nome_cliente = dados.get('nome_cliente')
        email_cliente = dados.get('email_cliente')
        tel_cliente = dados.get('tel_cliente')
        cpf_cliente = dados.get('cpf_cliente')

        # Validação dos campos obrigatórios
        if not nome_cliente or not email_cliente or not tel_cliente or not cpf_cliente:
            return jsonify({"message": "Todos os campos são obrigatórios!"}), 400

        # Criando nova instância de Usuario
        novo_cliente = Cliente(
            nome_cliente=dados['nome_cliente'],
            email_cliente=dados.get('email_cliente'),
            tel_cliente=dados.get('tel_cliente'),
            cpf_cliente=dados.get('cpf_cliente')
        )

        # Salvando o novo usuário no banco de dados
        print("Adicionando ao banco de dados...")
        db.session.add(novo_cliente)
        db.session.commit()
        print("Cliente salvo com sucesso!")

        return jsonify({"message": "Cliente cadastrado com sucesso!"}), 201

    except Exception as e:
        db.session.rollback()
        print(f"Erro ao salvar no banco de dados: {str(e)}")
        return jsonify({"message": f"Erro ao cadastrar o Cliente: {str(e)}"}), 400
    
@app.route('/api/clientes', methods=['GET'])
def listar_clientes():
    
    try:
        clientes = Cliente.query.all()  # Consulta todos os usuários
        if not clientes:
            return jsonify({"message": "Nenhum cliente encontrado"}), 404
        clientes_json = [cliente.to_dict() for cliente in clientes]  # Usando o método to_dict
        return jsonify(clientes_json), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao listar os cliente: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
