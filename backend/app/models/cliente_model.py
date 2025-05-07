from flask_sqlalchemy import SQLAlchemy
from app.app_factory import db

class Cliente(db.Model):
    __tablename__ = 'tbl_clientes' # Nome correto da tabela no banco de dados
    
    id_cliente = db.Column(db.Integer, primary_key=True)
    nome_cliente = db.Column(db.String(100), nullable=False)
    email_cliente = db.Column(db.String(100), nullable=True, default=None)
    tel_cliente = db.Column(db.BigInteger, nullable=True, unique=True)
    cpf_cliente = db.Column(db.BigInteger, nullable=False, unique=True)
    
    def to_dict(self):
        return {
            'id_cliente': self.id_cliente,
            'nome_cliente': self.nome_cliente,
            'email_cliente': self.email_cliente,
            'tel_cliente': self.tel_cliente,
            'cpf_cliente': self.cpf_cliente
        }