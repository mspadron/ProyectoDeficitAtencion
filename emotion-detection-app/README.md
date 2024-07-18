# Emotion Detection App

Esta aplicación utiliza React, Vite y la API de MorphCast para detectar y mostrar emociones en tiempo real a través de la cámara web.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js (versión 14.0 o superior)
- npm (normalmente viene con Node.js)

## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación:

1. Clona el repositorio:
   ```
   git clone https://github.com/mspadron/ProyectoDeficitAtencion.git
   cd emotion-detection-app
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y añade tu clave de licencia de MorphCast:
   ```
   VITE_MORPHCAST_LICENSE_KEY=tu_clave_de_licencia_aqui
   ```

4. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

5. Abre tu navegador y visita `http://localhost:5173` (o el puerto que Vite indique en la consola).

## Uso

Una vez que la aplicación esté en funcionamiento:

1. Permite el acceso a la cámara web cuando el navegador lo solicite.
2. La aplicación comenzará a analizar las emociones en tiempo real.
3. Los resultados se mostrarán en las tarjetas en la pantalla.

## Estructura del proyecto

- `src/components/EmotionDetectionApp.jsx`: Componente principal de la aplicación.
- `src/App.jsx`: Componente raíz de la aplicación.
- `src/index.css`: Estilos globales y configuración de Tailwind CSS.
- `tailwind.config.js`: Configuración de Tailwind CSS.
- `vite.config.js`: Configuración de Vite.

## Personalización

Para personalizar la aplicación:

- Modifica los estilos en `src/components/EmotionDetectionApp.jsx` utilizando clases de Tailwind CSS.
- Ajusta la lógica de detección de emociones en la función `initializeMorphCast()` dentro de `EmotionDetectionApp.jsx`.

## Problemas conocidos

- La aplicación requiere una conexión a internet para cargar las bibliotecas de MorphCast.
- El rendimiento puede variar dependiendo de la capacidad de procesamiento del dispositivo.

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para sugerir cambios o mejoras.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
