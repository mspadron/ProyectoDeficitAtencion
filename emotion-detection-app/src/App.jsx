import React from 'react';
import Header from './components/Header';
import TestD2 from './components/TestD2';
import EmotionDetectionApp from './components/EmotionDetectionApp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="w-full mx-auto mt-10 mx-3 p-6 App bg-gray-100">
        <Routes>
          <Route path="/test-d2" element={<TestD2 />} />
          <Route path="/emotion-detection" element={<EmotionDetectionApp />} />
          <Route exact path="/" element={<TestD2 />} />
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
