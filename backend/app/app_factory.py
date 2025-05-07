from flask import Flask
from flask_cors import CORS
from app.config import DATABASE_URI
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Configuração do banco de dados
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicializando o banco de dados
    db.init_app(app)

    # Habilitar CORS para o frontend no localhost:5173
    CORS(app, origins=["http://localhost:5173"], allow_headers=["Content-Type", "Authorization"])

 

    return app