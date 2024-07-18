import React, { useEffect, useRef, useState } from 'react';

const EmotionDetectionApp = () => {
  const videoRef = useRef(null);
  const [emotionData, setEmotionData] = useState({
    age: 'N/A',
    gender: 'N/A',
    bored: 'N/A',
    attentive: 'N/A',
    tense: 'N/A',
    uncomfortable: 'N/A',
    happy: 'N/A',
    sad: 'N/A',
    frustrated: 'N/A',
    angry: 'N/A',
    anxious: 'N/A',
    confident: 'N/A',
    selfConfident: 'N/A',
  });

  useEffect(() => {
    // Load MorphCast scripts
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    Promise.all([
      loadScript('https://sdk.morphcast.com/mphtools/v1.1/mphtools.js'),
      loadScript('https://ai-sdk.morphcast.com/v1.16/ai-sdk.js'),
      loadScript('https://sdk.morphcast.com/emotion-statistics/v1.0-beta/script.js'),
    ]).then(() => {
      initializeMorphCast();
    });

    // Initialize webcam
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.error('Error accessing webcam:', err));

    return () => {
      // Cleanup function
    };
  }, []);

  const initializeMorphCast = () => {
    const statsConfig = {
      sendDatainterval: 5000,
      tickInterval: 1000,
      stopAfter: 300000,
      licenseKey: import.meta.env.VITE_MORPHCAST_LICENSE_KEY,
    };
    const statisticsUploader = new window.MorphCastStatistics.StatisticsUploader(statsConfig);

    console.log("licence: " + import.meta.env.VITE_MORPHCAST_LICENSE_KEY);

    window.CY.loader()
      .licenseKey(import.meta.env.VITE_MORPHCAST_LICENSE_KEY)
      .addModule(window.CY.modules().FACE_AROUSAL_VALENCE.name, { smoothness: 0.70 })
      .addModule(window.CY.modules().FACE_EMOTION.name, { smoothness: 0.40 })
      .addModule(window.CY.modules().FACE_ATTENTION.name, { smoothness: 0.83 })
      .addModule(window.CY.modules().FACE_WISH.name, { smoothness: 0.8 })
      .addModule(window.CY.modules().FACE_POSE.name, { smoothness: 0.65 })
      .addModule(window.CY.modules().FACE_AGE.name, { rawOutput: false })
      .addModule(window.CY.modules().FACE_GENDER.name, { smoothness: 0.95, threshold: 0.70 })
      .addModule(window.CY.modules().FACE_FEATURES.name, { smoothness: 0.90 })
      .addModule(window.CY.modules().FACE_DETECTOR.name, { maxInputFrameSize: 320, smoothness: 0.83 })
      .addModule(window.CY.modules().ALARM_MORE_FACES.name, { timeWindowMs: 3000, initialToleranceMs: 7000, threshold: 0.33 })
      .addModule(window.CY.modules().ALARM_NO_FACE.name, { timeWindowMs: 10000, initialToleranceMs: 7000, threshold: 0.75 })
      .addModule(window.CY.modules().DATA_AGGREGATOR.name, { initialWaitMs: 2000, periodMs: 1000 })
      .addModule(window.CY.modules().FACE_POSITIVITY.name, { smoothness: 0.40, gain: 2, angle: 17 })
      .load()
      .then(async ({ start, stop }) => {
        await start();
        await statisticsUploader.start();

        setTimeout(async () => {
          await statisticsUploader.stop();
          await stop();
        }, statsConfig.stopAfter);
      });

    window.addEventListener(window.CY.modules().DATA_AGGREGATOR.eventName, (evt) => {
      const detail = evt.detail;
      if (detail) {
        setEmotionData(prevData => ({
          ...prevData,
          age: detail.age?.avg ?? 'N/A',
          gender: detail.gender_mostConfident?.distribution ? Object.keys(detail.gender_mostConfident.distribution)[0] : 'N/A',
          bored: detail.affects38_Bored?.avg ?? 'N/A',
          attentive: detail.affects98_Attentive?.avg ?? 'N/A',
          tense: detail.affects98_Tense?.avg ?? 'N/A',
          uncomfortable: detail.affects38_Uncomfortable?.avg ?? 'N/A',
          happy: detail.affects38_Happy?.avg ?? 'N/A',
          sad: detail.affects38_Sad?.avg ?? 'N/A',
          frustrated: detail.affects38_Frustrated?.avg ?? 'N/A',
          angry: detail.affects38_Angry?.avg ?? 'N/A',
          anxious: detail.affects38_Anxious?.avg ?? 'N/A',
          confident: detail.affects98_Confident?.avg ?? 'N/A',
          selfConfident: detail.affects98_Selfconfident?.avg ?? 'N/A',
        }));
      }
    });

    window.MphTools.CameraPrivacyPopup.setText({
      "title": "Allow us to use your camera",
      "description": "This experience is designed to be viewed with your camera on. The next screen will ask your consent to access data from your camera.",
      "url": "https://YOUR_DOMAIN/<YOUR_PRIVACY_POLICY>"
    });
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Detección de Emociones</h1>
      <div className="mb-8">
        <div className="relative w-3/12 max-w-2xl mx-auto border-4 border-blue-500 rounded-lg overflow-hidden shadow-lg">
          <video ref={videoRef} autoPlay muted className="w-full h-auto" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard title="Demografía" icon="👤">
          <DataItem label="Edad" value={emotionData.age} />
          <DataItem label="Género" value={emotionData.gender} />
        </InfoCard>
        <InfoCard title="Atención" icon="👀">
          <DataItem label="Aburrido" value={emotionData.bored} />
          <DataItem label="Atento" value={emotionData.attentive} />
        </InfoCard>
        <InfoCard title="Inquietudes" icon="😰">
          <DataItem label="Tenso" value={emotionData.tense} />
          <DataItem label="Incómodo" value={emotionData.uncomfortable} />
        </InfoCard>
        <InfoCard title="Emociones" icon="😊">
          <DataItem label="Feliz" value={emotionData.happy} />
          <DataItem label="Triste" value={emotionData.sad} />
          <DataItem label="Frustrado" value={emotionData.frustrated} />
          <DataItem label="Enojado" value={emotionData.angry} />
        </InfoCard>
        <InfoCard title="Ansiedad" icon="😨">
          <DataItem label="Ansioso" value={emotionData.anxious} />
        </InfoCard>
        <InfoCard title="Confianza" icon="💪">
          <DataItem label="Confiado" value={emotionData.confident} />
          <DataItem label="Seguro de sí mismo" value={emotionData.selfConfident} />
        </InfoCard>
      </div>
    </div>
  );
};

const InfoCard = ({ title, icon, children }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
    <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
      <span className="mr-2 text-2xl">{icon}</span>
      {title}
    </h3>
    <div className="space-y-2">
      {children}
    </div>
  </div>
);

const DataItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600">{label}:</span>
    <span className="font-medium text-blue-600">{value}</span>
  </div>
);

export default EmotionDetectionApp;