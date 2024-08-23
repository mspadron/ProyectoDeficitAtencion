// EmotionDetectionApp.js
import React from 'react';
import useMorphCast from '../hooks/useMorphCast';
import Camera from './Camera';
import EmotionInfo from './EmotionInfo';
import RecordingControl from './RecordingControl';

const EmotionDetectionApp = () => {

  //const emotionData = useMorphCast();

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Detección de Emociones</h1>
      <div className="mb-8">
        {/*<Camera />*/}
      </div>
      <EmotionInfo />
      <RecordingControl />
    </div>
  );
};

export default EmotionDetectionApp;