// components/RecordingControl.js
import React, { useState, useEffect } from 'react';
import useApiService from '../hooks/useApiService';

const RecordingControl = ({ emotionData }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedData, setRecordedData] = useState([]);
  const { sendData, isLoading, error } = useApiService();

  useEffect(() => {
    if (isRecording) {
      setRecordedData(prevData => [...prevData, emotionData]);
    }
  }, [emotionData, isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      finalizarGrabacion();
    } else {
      iniciarGrabacion();
    }
  };

  const iniciarGrabacion = () => {
    setIsRecording(true);
    setRecordedData([]);
  };

  const finalizarGrabacion = async () => {
    setIsRecording(false);
    await enviarDatos();
  };

  const enviarDatos = async () => {
    const dataToSend = {
      testName: 'Sample Test',
      ...Object.keys(emotionData).reduce((acc, key) => {
        acc[key] = recordedData.map(data => data[key]);
        return acc;
      }, {})
    };

    try {
      const result = await sendData(dataToSend);
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="mt-8 text-center">
      <button
        onClick={toggleRecording}
        className={`px-6 py-2 rounded-lg ${isRecording ? 'bg-red-500' : 'bg-blue-500'} text-white`}
        disabled={isLoading}
      >
        {isRecording ? 'Detener Grabación' : 'Iniciar Grabación'}
      </button>
      {isLoading && <p>Enviando datos...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
};

export default RecordingControl;