from flask import Blueprint, request, jsonify
from app.models.servico_model import Servico, db

servico_bp = Blueprint('servico_bp', __name__, url_prefix='/api/servicos')

# Criar um novo serviço
@servico_bp.route('', methods=['POST'])
def criar_servico():
    try:
        dados = request.get_json()
        novo_servico = Servico(
            nome_servico=dados['nome_servico'],
            descricao=dados['descricao'],
            valor=dados['valor'],
            id_orcamento=dados['id_orcamento'],
            id_cliente=dados['id_cliente'],
            id_usuario=dados['id_usuario'],
            status=dados.get('status', 'Pendente'),
            data_inicio=dados.get('data_inicio'),
            data_fim=dados.get('data_fim')
        )
        db.session.add(novo_servico)
        db.session.commit()
        return jsonify({"message": "Serviço cadastrado com sucesso!"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Erro ao cadastrar o serviço: {str(e)}"}), 400

# Listar todos os serviços
@servico_bp.route('', methods=['GET'])
def listar_servicos():
    try:
        servicos = Servico.query.all()
        servicos_json = [servico.to_dict() for servico in servicos]
        return jsonify(servicos_json), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao listar os serviços: {str(e)}"}), 500

# Obter um serviço específico
@servico_bp.route('/<int:id_servico>', methods=['GET'])
def obter_servico(id_servico):
    servico = Servico.query.get(id_servico)
    if not servico:
        return jsonify({"message": "Serviço não encontrado"}), 404
    return jsonify(servico.to_dict()), 200

# Atualizar um serviço
@servico_bp.route('/<int:id_servico>', methods=['PUT'])
def atualizar_servico(id_servico):
    servico = Servico.query.get(id_servico)
    if not servico:
        return jsonify({"message": "Serviço não encontrado"}), 404

    try:
        dados = request.get_json()
        servico.nome_servico = dados.get('nome_servico', servico.nome_servico)
        servico.descricao = dados.get('descricao', servico.descricao)
        servico.valor = dados.get('valor', servico.valor)
        servico.status = dados.get('status', servico.status)
        servico.data_inicio = dados.get('data_inicio', servico.data_inicio)
        servico.data_fim = dados.get('data_fim', servico.data_fim)

        db.session.commit()
        return jsonify({"message": "Serviço atualizado com sucesso!"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Erro ao atualizar o serviço: {str(e)}"}), 400

# Excluir um serviço
@servico_bp.route('/<int:id_servico>', methods=['DELETE'])
def excluir_servico(id_servico):
    servico = Servico.query.get(id_servico)
    if not servico:
        return jsonify({"message": "Serviço não encontrado"}), 404

    try:
        db.session.delete(servico)
        db.session.commit()
        return jsonify({"message": "Serviço excluído com sucesso!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Erro ao excluir o serviço: {str(e)}"}), 400
