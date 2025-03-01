# models.py

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'tbl_usuarios'  # Nome correto da tabela no banco de dados

    id_usuario = db.Column(db.Integer, primary_key=True)
    nome_usuario = db.Column(db.String(100), nullable=False)
    email_usuario = db.Column(db.String(100), nullable=True, default=None)
    tel_usuario = db.Column(db.BigInteger, nullable=True, unique=True)
    senha_usuario = db.Column(db.String(50), nullable=False)
    cargo_usuario = db.Column(db.String(100), nullable=False)
    cpf_usuario = db.Column(db.BigInteger, nullable=False, unique=True)
    tipo_usuario = db.Column(db.String(5), nullable=False)

    def to_dict(self):
        return {
            'id_usuario': self.id_usuario,
            'nome_usuario': self.nome_usuario,
            'email_usuario': self.email_usuario,
            'tel_usuario': self.tel_usuario,
            'senha_usuario': self.senha_usuario,
            'cargo_usuario': self.cargo_usuario,
            'cpf_usuario': self.cpf_usuario,
            'tipo_usuario': self.tipo_usuario
        }
