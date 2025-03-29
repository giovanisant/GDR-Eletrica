# run.py
from app.app_factory import create_app
from app.routes.usuario_route import usuario_bp
from app.routes.cliente_route import cliente_bp

# Criando a instância da aplicação
app = create_app()

# Registrando os Blueprints
app.register_blueprint(usuario_bp)
app.register_blueprint(cliente_bp)

@app.route('/')
def home():
    return 'Bem-vindo à API!'

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
