# Proyecto de Detección de TDH

Este proyecto incluye un servidor backend en Flask y una aplicación frontend en React con Vite. La aplicación también usa MongoDB para el almacenamiento de datos.

## Instalación
Clonamos el repocitorio
```
git clone https://github.com/mspadron/ProyectoDeficitAtencion.git
```


### 1. Instalación de MongoDB con Docker

Ejecuta el siguiente comando para iniciar un contenedor MongoDB:

```
docker run -d --name mongodb -p 27017:27017 mongo:latest
```
Esto ejecutará MongoDB en un contenedor Docker y expondrá el puerto 27017 en tu máquina local.

### 2. Instalación del Servidor en Python (Flask)
Entramos a la carpeta del servidor

```
cd server
```
Crea un entorno virtual para el proyecto:

```
python -m venv venv
```
Activa el entorno virtual:
En Windows:

```
venv\Scripts\activate
```

En macOS/Linux:

```
source venv/bin/activate
```

Instala las dependencias del proyecto:

```
pip install -r requirements.txt
```
Ejecuta el servidor Flask:

```
flask run
```
El servidor estará disponible en http://127.0.0.1:5000.

### 3. Instalación del Cliente con React + Vite y JS
Navegamos a la carpeta del cliente

```
cd emotion-detection-app
```

Instala las dependencias del proyecto:

```
npm install
```

Ejecuta la aplicación React:

```
npm run dev
```

La aplicación estará disponible en http://localhost:5173.

## Uso
### 1. Iniciar Grabación
En la aplicación frontend, haz clic en el botón "Iniciar Grabación" para comenzar a capturar datos de emociones.

### 2. Finalizar Grabación
Haz clic en el botón "Finalizar Grabación" para detener la captura y enviar los datos al servidor.

### 3. Ver Datos
Los datos serán enviados al servidor y almacenados en MongoDB.