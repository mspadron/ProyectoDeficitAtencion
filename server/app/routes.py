from flask import request, jsonify
from bson.objectid import ObjectId
from app import app, db
from app.models import data_model
from app.validations import validate_data

collection = db.test_collection

@app.route('/add_data', methods=['POST'])
def add_data():
    data = request.json
    if validate_data(data):
        inserted_id = collection.insert_one(data).inserted_id
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