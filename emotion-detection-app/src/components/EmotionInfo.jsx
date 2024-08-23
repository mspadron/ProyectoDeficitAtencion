import React, { useState } from 'react';
import GameMemory from './GameMemory';
import VisualGame from './VisualGame/VisualGame';
import LecturaComponent from './Lectura';

const JuegoMemoria = ({ onComplete }) => {
  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h3 className="font-bold mb-2">Juego de Memoria: Parejas de Emojis</h3>
      <p>Encuentra las parejas de emojis en el menor tiempo posible.</p>
      <GameMemory onComplete={onComplete} />
    </div>
  );
};

const Lectura = ({ onComplete }) => {
  return (
    <div className="p-4 bg-green-100 rounded-lg">
      <p>Lee el cuento corto "El Árbol Generoso" de Shel Silverstein.</p>
      <LecturaComponent onComplete={onComplete} />
    </div>
  );
};

const JuegoVisual = ({ onComplete }) => {
  return (
    <div className="p-4 bg-yellow-100 rounded-lg">
      <h3 className="font-bold mb-2">Juego Visual: Ordena los números</h3>
      <p>Arrastra los números a las casillas vacías y ordénalos del 1 al 15. Solo se puede mover a la casilla los números que están a un lado de la misma.</p>
      <VisualGame onComplete={onComplete} />
    </div>
  );
};

const EmotionInfo = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [completedActivities, setCompletedActivities] = useState([false, false, false]);

  const activities = [
    { name: "Juego de Memoria: Parejas de Emojis", component: JuegoMemoria },
    { name: "Lectura: 'El Árbol Generoso'", component: Lectura },
    { name: "Juego Visual: Ordena los números", component: JuegoVisual },
  ];

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleComplete = () => {
    const newCompletedActivities = [...completedActivities];
    newCompletedActivities[currentActivity] = true;
    setCompletedActivities(newCompletedActivities);
  };

  const handleNext = () => {
    if (currentActivity < activities.length - 1) {
      setCurrentActivity(currentActivity + 1);
    }
  };

  const handleFinish = () => {
    setIsStarted(false);
    setCurrentActivity(0);
    setCompletedActivities([false, false, false]);
  };

  const allActivitiesCompleted = completedActivities.every(activity => activity);

  const CurrentActivityComponent = activities[currentActivity]?.component;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md flex">
      {/* Checklist de actividades */}
      <div className="w-1/4 pr-4 border-r">
        <h3 className="font-bold mb-2">Actividades:</h3>
        <ul>
          {activities.map((activity, index) => (
            <li key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={completedActivities[index]}
                readOnly
                className="mr-2"
              />
              <span className={completedActivities[index] ? 'line-through' : ''}>
                {activity.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="w-3/4 pl-4">
        {!isStarted ? (
          <button onClick={handleStart} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Iniciar Actividades
          </button>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">{activities[currentActivity].name}</h2>
            <CurrentActivityComponent onComplete={handleComplete} />
            <div className="flex justify-between mt-4">
              <button 
                onClick={handleNext} 
                disabled={!completedActivities[currentActivity] || currentActivity === activities.length - 1}
                className={`font-bold py-2 px-4 rounded ${!completedActivities[currentActivity] || currentActivity === activities.length - 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
              >
                Siguiente
              </button>
            </div>
            {allActivitiesCompleted && (
              <button 
                onClick={handleFinish} 
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Terminar Actividades
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionInfo;
