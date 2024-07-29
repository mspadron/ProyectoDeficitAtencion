// components/Camera.js
import React, { useRef, useEffect } from 'react';

const Camera = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.error('Error accessing webcam:', err));
  }, []);

  return (
    <div className="relative w-3/12 max-w-2xl mx-auto border-4 border-blue-500 rounded-lg overflow-hidden shadow-lg">
      <video ref={videoRef} autoPlay muted className="w-full h-auto" />
    </div>
  );
};

export default Camera;