// components/EmotionInfo.js
import React from 'react';

const InfoCard = ({ title, icon, children }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
    <div className="text-3xl mb-2">{icon}</div>
    <h2 className="text-xl font-semibold mb-2 text-blue-600">{title}</h2>
    <div>{children}</div>
  </div>
);

const DataItem = ({ label, value }) => (
  <p className="text-gray-700">
    <span className="font-semibold">{label}:</span> {value}
  </p>
);

const EmotionInfo = ({ emotionData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </InfoCard>
  </div>
);

export default EmotionInfo;