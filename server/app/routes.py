from flask import request, jsonify
from bson.objectid import ObjectId
from app import app, db
from app.validations import validate_data
from datetime import datetime  # Importa el módulo datetime
from app.summaryController import calcular_promedios


collection = db.tdaData

collectionSumary = db.tdaDataSumary

@app.route('/add_data', methods=['POST'])
def add_data():
    data = request.json
    
    # Añade la fecha y hora actual al JSON
    data['fecha_test'] = datetime.now().isoformat()
    data['nombre_paciente'] = "nombre prueba"
    data['cedula_paciente'] = "1710107825"
    data['edad_paciente'] = 25
    data['tiempo_test_segundos'] = 358

    
    if validate_data(data):
        summary = calcular_promedios(data)
        inserted_id = collection.insert_one(data).inserted_id
        collectionSumary.insert_one(summary)
        return jsonify({"message": "Data added successfully!", "id": str(inserted_id)}), 201
    else:
        return jsonify({"error": "Invalid data format"}), 400

@app.route('/get_data/<id>', methods=['GET'])
def get_data(id):
    data = collection.find_one({"_id": ObjectId(id)})
    if data:
        data["_id"] = str(data["_id"])
        return jsonify(data), 200
    else:
        return jsonify({"error": "Data not found"}), 404

@app.route('/get_all_data', methods=['GET'])
def get_all_data():
    data = list(collection.find())
    for item in data:
        item["_id"] = str(item["_id"])
    return jsonify(data), 200