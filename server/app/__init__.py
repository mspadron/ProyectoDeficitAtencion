from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas
#CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}) # Habilita CORS para todas las rutas desde un origen específico



# Configuración de MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client.DeficitAtencionDB

from app import routes
