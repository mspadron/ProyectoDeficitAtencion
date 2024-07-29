from app.models import data_model

def validate_data(data):
    for key, value_type in data_model.items():
        if key not in data or not isinstance(data[key], value_type):
            return False
    return True
