import React, { useState, useEffect } from 'react';

const TestD2 = () => {
    const initialTestData = [
        ["d'", "d", "p", 'p"', "p'", "d'", 'd"', '"d', "d'", "p'", "p", "p'", 'd"', 'p"', "p'", "d", "d'", "p", "p", "d'", '"d', "d'", "d", "p'", "p'", 'p"', "d'", "d'", "d", "d'", '"d', "d'", "p", "d'", 'd"', "d'", "p'", "p", "d", "p'", "d'"],
        ["p'", 'p"', 'd"', "p'", "d", "d'", "p", "d'", "p", "d'", 'd"', "p", "p", "p", "p", 'p"', "d", "d'", '"d', "p", "p'", "p'", "d'", '"d', "p'", "p", "p", "d'", "p'", 'p"', "d", "d", "d", "d'", 'p"', "d", "d", "p'", "d", "p", "d'"],
        ['d"', "p", "p", 'p"', "p", "p", "p'", 'd"', "d", "p", "d", "d'", "d'", "d'", "p'", "p", 'p"', "d", "d'", "d", "p'", '"d', "d'", "p'", "p", 'd"', "d'", "d'", '"d', "p'", "p", "p", 'd"', "p", 'p"', "p'", "d", "d", "d", "d'", 'd"'],
        ["d'", 'd"', "p'", 'p"', "p", "d'", "d", "p'", "p", "d", 'd"', "p", "p", 'd"', 'd"', 'p"', "d", "p'", '"d', "p", "d", "p", "p", 'd"', "d", "d", 'p"', "d'", 'p"', "d'", "p", "d", "p'", "d'", 'p"', "d", "p'", "d", "d", "p", "d'"],
        ["p", "p'", "p'", "p'", "p", "p'", "d", "d", "p'", "p'", "d", "d'", "p", "d'", "d'", "p'", "p'", 'd"', "d", "p'", '"d', "p", "p'", 'd"', "p", "p'", "p'", "p", "p", 'd"', "d'", "p'", "d'", "p", 'd"', "p", "p'", "d", "p", "d", "d'"],
        ["p'", "p", "p", "d", "p'", "p", "d'", "p", "p'", "p'", "p'", "p", "d'", '"d', "d'", "p", "p", "p'", "d", "p", "p'", "d'", "p'", "p", "p", "p", "d", 'd"', "d", "p", "d", "d", "p", 'd"', 'd"', "p'", "p", "d'", "d", 'd"', "d'"],
        ["d'", "p", "p", 'd"', "d'", "p'", 'p"', "d'", 'd"', "p'", "p", "d'", 'p"', "d'", "p", 'p"', "p", "p'", 'd"', "p'", "p", "d", "p'", 'd"', "p", "p", "d'", "p'", "p", 'd"', "d'", "d'", "p'", "p", "p'", 'p"', "p", "d", "d", "d", "d'"],
        ["d", "p'", "d", "p", 'd"', 'p"', "d'", "p'", "d", "d'", "p", "p'", "p'", "d'", "p", 'p"', "d", "d'", "p'", "p", "p", "d'", "d'", "p", "p", "p'", "d", "p", "p'", 'd"', 'p"', "d", "p", "d'", "d", "p", "p", "d'", "d'", "p", "d'"],
        ["d'", "p'", "d'", 'p"', "p'", "p", "p", "d'", 'd"', 'd"', "d", "p'", "p'", "d", "d", "d", "d'", "d", "p'", "p", "p", "p'", "p", "d'", "p", "p", "p", 'p"', "p'", "d'", "d", "p", "p", "d", "p", "d", "p'", "p", "p", "p'", "p"],
        ['p"', "p", "d", "p", "p", "d'", "d'", 'd"', "p", 'p"', "p", 'p"', 'p"', "d'", 'd"', "p", "d'", 'd"', "p", "p", "d", 'd"', "d'", "p", "p'", "p'", "d'", "p", "d", "d", "p'", "p", "p", "p", "p", "p", "p'", "p", "d", "p", "d'"],
        ["p", "p", "d'", "d", "p'", "d'", "p'", "p", 'p"', "p", "p'", "d'", "p", 'd"', "p", "p", 'p"', "p", "p", "d'", "d", "p", "p'", "d'", "d", "d", "d", "p", 'd"', "p", 'p"', "d'", 'd"', "d'", 'd"', "p", "p", "p", 'd"', "d", "d'"],
        ['p"', "d'", "p", "d", "p", "p", "p", 'p"', "d", "p'", "d", "d", "p'", "d'", "d", "p'", 'd"', "p", 'p"', "p'", "p", "d", "p'", "p", "p'", "p'", "p'", "p", "d", "d", "p", "p'", "p'", 'p"', "d", "d'", "d'", "p", "d'", 'd"', 'd"'],
        ["d", "p", "p", "d'", "d'", "p", "d", "p", "d'", "p", "d", "p", "d", 'd"', 'd"', "p", "d'", "p", "d", "d'", "p", "p'", "p", "d'", "d", "p'", "p", 'p"', "p", "d", "p", "p", "p", "d", "p", "p'", "p", "p", "p", "d", "p"],
        ["d'", 'd"', "p'", "p'", "d'", "p'", 'p"', "d", "d'", "p", "d'", "p", "p'", 'd"', "d", "d'", "p", "p", "p", "p", "d'", 'p"', "d'", "p'", "p'", 'd"', "d", "p", "p", 'p"', "d", "p", "p", 'p"', "d", 'd"', "p", "p", "p", "d", "d'"],
    ];

    const [checked, setChecked] = useState(initialTestData.map(row => Array(row.length).fill(false)));
    const [isStarted, setIsStarted] = useState(false);
    const [time, setTime] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [results, setResults] = useState({
        total: 0,
        correct: 0,
        incorrect: 0,
        faltantes: 0
    });

    // Manejo del cronómetro
    useEffect(() => {
        let intervalId;

        if (isStarted && !isFinished) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isStarted, isFinished]);

    const handleCheck = (rowIndex, colIndex) => {
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
                    if (checked[rowIndex][colIndex] && (item === '"d' || item === 'd"')) {
                        correct++;
                    } 
                }

                if (checked[rowIndex][colIndex] && (item !== '"d' && item !== 'd"')) {
                    incorrect++;
                }
            });
            faltantes = total - correct;
        });

        setResults({ total, correct, incorrect, faltantes });
    };

    const handleStart = () => {
        setIsStarted(true);
        setIsFinished(false);
        setChecked(initialTestData.map(row => Array(row.length).fill(false)));
        setResults({ total: 0, correct: 0, incorrect: 0, faltantes: 0 });
        setTime(0);
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
                    <table className="table-auto w-full">
                        <tbody>
                            {initialTestData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((item, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="p-2 border"
                                        >
                                            <div className="flex items-center cursor-pointer hover:bg-gray-200"
                                                onClick={() => handleCheck(rowIndex, colIndex)}
                                            >
                                                <div className='u'>
                                                    <input
                                                        type="checkbox"
                                                        checked={checked[rowIndex][colIndex]}
                                                        onChange={() => handleCheck(rowIndex, colIndex)}
                                                        className="mr-2 cursor-pointer"
                                                    />
                                                </div>
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
                </>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold">{`Tiempo: ${formatTime(time)}`}</span>
                        <button onClick={handleFinish} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                            Finalizar
                        </button>
                    </div>
                    <table className="table-auto w-full">
                        <tbody>
                            {initialTestData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((item, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="p-2 border cursor-pointer hover:bg-gray-200"
                                            onClick={() => !isFinished && handleCheck(rowIndex, colIndex)}
                                        >
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={checked[rowIndex][colIndex]}
                                                    onChange={() => handleCheck(rowIndex, colIndex)}
                                                    className="mr-2"
                                                    disabled={isFinished}
                                                />
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
