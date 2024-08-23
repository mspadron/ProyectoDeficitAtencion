import json

def calcular_promedios(data):
    # Inicializar un diccionario para almacenar los promedios
    promedios = {}
    promedios["nombre_paciente"] = data["nombre_paciente"]
    promedios["cedula_paciente"] = data["cedula_paciente"]
    promedios["edad_paciente"] = data["edad_paciente"]
    promedios["fecha_test"] = data["fecha_test"]
    promedios["tiempo_test_segundos"] = data["tiempo_test_segundos"]
    promedios["testName"] = data["testName"]
    
    # Iterar sobre cada clave en el diccionario
    for key, values in data.items():
        # Verificar si el valor es una lista
        if isinstance(values, list):
            # Convertir "N/A" a 0 y calcular el promedio
            numeric_values = [0 if v == "N/A" else float(v) for v in values]
            promedio = sum(numeric_values) / len(numeric_values) if numeric_values else 0
            promedios[key] = promedio
            
    return promedios