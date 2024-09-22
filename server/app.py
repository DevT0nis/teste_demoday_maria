from flask import Flask, jsonify, request
from flask_cors import CORS  # Importando CORS
import os
import subprocess

app = Flask(__name__)

# Habilitar CORS para qualquer origem
CORS(app)

# Rota para processar a detecção da palavra-chave
@app.route('/api/detect-keyword', methods=['POST'])
def detect_keyword():
    data = request.get_json()
    keyword = data.get('keyword')

    if keyword.lower() == "emergência":
        # Simulação de chamada para 190
        if os.name == "nt":  # Windows
            subprocess.call(["start", "tel://190"], shell=True)
        else:  # Outros sistemas (Linux)
            subprocess.call(["xdg-open", "tel://190"])

        return jsonify({"message": "Palavra-chave detectada, ligando para 190."}), 200
    else:
        return jsonify({"message": "Palavra-chave não reconhecida."}), 400

if __name__ == "__main__":
    app.run(debug=True)
