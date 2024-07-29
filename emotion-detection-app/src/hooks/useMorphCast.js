// hooks/useMorphCast.js
import { useState, useEffect } from 'react';

const useMorphCast = () => {
  const [emotionData, setEmotionData] = useState({
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
  });

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeMorphCast = () => {
      const licenseKey = import.meta.env.VITE_MORPHCAST_LICENSE_KEY;
      if (!licenseKey) {
        console.error('MorphCast license key is missing');
        return;
      }

      if (window.CY) {
        window.CY.loader()
          .licenseKey(licenseKey)
          .addModule(window.CY.modules().FACE_AROUSAL_VALENCE.name)
          .addModule(window.CY.modules().FACE_EMOTION.name)
          .addModule(window.CY.modules().FACE_ATTENTION.name)
          .addModule(window.CY.modules().FACE_WISH.name)
          .addModule(window.CY.modules().FACE_POSE.name)
          .addModule(window.CY.modules().FACE_FEATURES.name)
          .addModule(window.CY.modules().FACE_DETECTOR.name)
          .addModule(window.CY.modules().DATA_AGGREGATOR.name)
          .load()
          .then(({ start }) => {
            start();
            window.addEventListener(window.CY.modules().DATA_AGGREGATOR.eventName, handleEmotionData);
            console.log('MorphCast initialized and started');
          })
          .catch((error) => {
            console.error('Error initializing MorphCast:', error);
          });

        window.MphTools.CameraPrivacyPopup.setText({
          "title": "Allow us to use your camera",
          "description": "This experience is designed to be viewed with your camera on. The next screen will ask your consent to access data from your camera.",
          "url": "https://YOUR_DOMAIN/<YOUR_PRIVACY_POLICY>"
        });
      } else {
        console.error('MorphCast SDK not loaded');
      }
    };

    Promise.all([
      loadScript('https://sdk.morphcast.com/mphtools/v1.1/mphtools.js'),
      loadScript('https://ai-sdk.morphcast.com/v1.16/ai-sdk.js'),
      loadScript('https://sdk.morphcast.com/emotion-statistics/v1.0-beta/script.js'),
    ])
    .then(() => {
      initializeMorphCast();
    })
    .catch((error) => {
      console.error('Error loading MorphCast scripts:', error);
    });

    return () => {
      // Cleanup function
      window.removeEventListener(window.CY?.modules()?.DATA_AGGREGATOR?.eventName, handleEmotionData);
    };
  }, []);

  const handleEmotionData = (evt) => {
    const detail = evt.detail;
    if (detail) {
      const newData = {
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
      };
      setEmotionData(newData);
      console.log('Emotion data received:', newData);
    }
  };

  return emotionData;
};

export default useMorphCast;
