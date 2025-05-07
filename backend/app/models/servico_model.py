from app.app_factory import db

class Servico(db.Model):
    __tablename__ = 'tbl_servicos'

    id_servico = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome_servico = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    valor = db.Column(db.Numeric(10, 2), nullable=False)
    id_orcamento = db.Column(db.Integer, db.ForeignKey('tbl_orcamento.id_orcamento'), nullable=False)
    id_cliente = db.Column(db.Integer, db.ForeignKey('tbl_clientes.id_cliente'), nullable=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey('tbl_usuarios.id_usuario'), nullable=False)
    status = db.Column(db.Enum('Pendente', 'Em Andamento', 'Concluído', 'Cancelado'), default='Pendente')
    data_inicio = db.Column(db.Date, nullable=True)
    data_fim = db.Column(db.Date, nullable=True)

    def to_dict(self):
        return {
            "id_servico": self.id_servico,
            "nome_servico": self.nome_servico,
            "descricao": self.descricao,
            "valor": float(self.valor),
            "id_orcamento": self.id_orcamento,
            "id_cliente": self.id_cliente,
            "id_usuario": self.id_usuario,
            "status": self.status,
            "data_inicio": self.data_inicio.strftime("%Y-%m-%d") if self.data_inicio else None,
            "data_fim": self.data_fim.strftime("%Y-%m-%d") if self.data_fim else None
        }
