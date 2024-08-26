import React, { useState, useEffect } from 'react';
import { initialTestData } from '../utils/test';

const TestD2 = () => {
    const [checked, setChecked] = useState(initialTestData.map(row => Array(row.length).fill(false)));
    const [corrects, setCorrects] = useState(initialTestData.map(row => Array(row.length).fill(0)));
    const [isStarted, setIsStarted] = useState(false);
    const [time, setTime] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [disabledRow, setDisabledRow] = useState(-1); // Nueva variable de estado para deshabilitar filas
    const [results, setResults] = useState({
        total: 0,
        correct: 0,
        incorrect: 0,
        faltantes: 0
    });

    // Manejo del cronómetro y deshabilitar filas cada 20 segundos
    useEffect(() => {
        let intervalId;

        if (isStarted && !isFinished) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
                if (time > 0 && time % 20 === 0) {
                    setDisabledRow(prevRow => prevRow + 1);
                }
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        if (disabledRow >= initialTestData.length) {
            handleFinish();
        }

        return () => clearInterval(intervalId);
    }, [isStarted, isFinished, time, disabledRow]);

    const handleCheck = (rowIndex, colIndex) => {
        if (rowIndex <= disabledRow) return; // Deshabilitar interacción si la fila está deshabilitada

        const newChecked = [...checked];
        newChecked[rowIndex][colIndex] = !newChecked[rowIndex][colIndex];
        setChecked(newChecked);
    };

    const handleFinish = () => {
        setIsFinished(true);

        let total = 0;
        let correct = 0;
        let incorrect = 0;
        let faltantes = 0;

        initialTestData.forEach((row, rowIndex) => {
            row.forEach((item, colIndex) => {
                if (item === '"d' || item === 'd"') {
                    total++;
                    if (checked[rowIndex][colIndex]) {
                        correct++;
                        corrects[rowIndex][colIndex] = 1;
                    } else {
                        corrects[rowIndex][colIndex] = 2;
                    }
                }
                if (checked[rowIndex][colIndex] && (item !== '"d' && item !== 'd"')) {
                    incorrect++;
                    corrects[rowIndex][colIndex] = 3;
                }
            });
        });

        faltantes = total - correct;
        setResults({ total, correct, incorrect, faltantes });
    };

    const handleStart = () => {
        setIsStarted(true);
        setIsFinished(false);
        setChecked(initialTestData.map(row => Array(row.length).fill(false)));
        setResults({ total: 0, correct: 0, incorrect: 0, faltantes: 0 });
        setTime(0);
        setDisabledRow(-1); // Reinicia la deshabilitación de filas
    };

    const handleRestart = () => {
        setIsStarted(false);
        setIsFinished(false);
        setChecked(initialTestData.map(row => Array(row.length).fill(false)));
        setCorrects(initialTestData.map(row => Array(row.length).fill(0)));
        setResults({ total: 0, correct: 0, incorrect: 0, faltantes: 0 });
        setTime(0);
        setDisabledRow(-1);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="w-full mt-10 p-2 bg-white rounded-md shadow-md flex flex-col">
            {!isStarted ? (
                <>
                    <h2 className="text-2xl font-semibold mb-4">Explicación del Test d2</h2>
                    <p className="mb-6">
                        El Test d2 es una prueba que mide la capacidad de atención y concentración. Consiste en identificar
                        todas las letras "d" con dos rayones entre muchas otras letras y símbolos. El objetivo es hacerlo
                        lo más rápido posible, evitando errores.
                    </p>
                    <button onClick={handleStart} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Iniciar Test
                    </button>
                </>
            ) : isFinished ? (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold">{`Tiempo: ${formatTime(time)}`}</span>
                    </div>
                    <table className="table-fixed w-full border-collapse">
                        <tbody>
                            {initialTestData.map((row, rowIndex) => (
                                <tr key={rowIndex} className='border-b-4 border-gray-500'>
                                    {row.map((item, colIndex) => (
                                        <td key={colIndex}>
                                            <div
                                                className={`${
                                                    corrects[rowIndex][colIndex] === 1 ? "bg-green-400" : corrects[rowIndex][colIndex] === 2 ? "bg-neutral-400" : corrects[rowIndex][colIndex] === 3 ? "bg-red-400" : "bg-transparent"
                                                } text-xl p-1 font-semibold flex items-center rounded justify-center w-full my-2`}
                                            >
                                                <span>{item}</span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold">Resultados</h3>
                        <p>Total de "d" y "d": <span className="font-bold">{results.total}</span></p>
                        <p>Marcados correctos: <span className="font-bold">{results.correct}</span></p>
                        <p>Marcados incorrectos: <span className="font-bold">{results.incorrect}</span></p>
                        <p>Faltantes: <span className="font-bold">{results.faltantes}</span></p>
                    </div>
                    <button onClick={handleRestart} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
                        Reiniciar Test
                    </button>
                </>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold">{`Tiempo: ${formatTime(time)}`}</span>
                        <button onClick={handleFinish} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Finalizar
                        </button>
                    </div>
                    <table className="table-fixed w-full select-none">
                        <tbody>
                            {initialTestData.map((row, rowIndex) => (
                                <tr key={rowIndex} className={`border-b-4 border-gray-500 ${disabledRow >= rowIndex ? 'opacity-50' : ''}`}>
                                    <td><p className='font-semibold'>{rowIndex + 1}.</p></td>
                                    {row.map((item, colIndex) => (
                                        <td key={colIndex}>
                                            <div
                                                className={`${
                                                    checked[rowIndex][colIndex] ? "bg-green-400" : rowIndex % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200'
                                                } text-2xl p-2 font-semibold flex items-center justify-center w-full cursor-pointer hover:bg-opacity-50 border-none border-collapse my-4 rounded`}
                                                onClick={() => !isFinished && handleCheck(rowIndex, colIndex)}
                                            >
                                                <span>{item}</span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default TestD2;
