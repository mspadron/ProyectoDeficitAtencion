// Game.js
import { useEffect, useState } from "react";
import shuffleArray from "../../utils/shuffleFunction";
import Puzzle from "./Puzzle";
import Timer from "./Timer";

export default function VisualGame({onComplete}) {
const [shuffledArray, setShuffledArray] = useState(shuffleArray());
const [moves, setMoves] = useState(0);
const [time, setTime] = useState(0);
const [timerActive, setTimerActive] = useState(false);
const [win, setWin] = useState(false);

useEffect(() => {
    if (moves === 1) setTimerActive(true);
    let won = true;
    for (let i = 0; i < shuffledArray.length - 1; i++) {
    const value = shuffledArray[i];
    if (i == value - 1) continue;
    else {
        won = false;
        break;
    }
    }
    if (won) {
    setWin(true);
    onComplete();
    setTimerActive(false);
    }
    return;
}, [moves]);

const newGame = () => {
    setMoves(0);
    setTimerActive(false);
    setTime(0);
    setShuffledArray(shuffleArray());
    setWin(false);
};

const dragStart = (e) => e.dataTransfer.setData("tile", e.target.id);

const dragOver = (e) => e.preventDefault();

const dropped = (e) => {
    e.preventDefault();
    const tile = e.dataTransfer.getData("tile");
    const oldPlace = Number(document.getElementById(tile).parentElement.id.slice(6)) - 1;
    const newPlace = Number(e.target.id.slice(6)) - 1;

    if (!(Math.abs(oldPlace - newPlace) == 4 || Math.abs(oldPlace - newPlace) == 1)) return;

    const [i, j] = [Math.min(oldPlace, newPlace), Math.max(oldPlace, newPlace)];
    setShuffledArray([
    ...shuffledArray.slice(0, i),
    shuffledArray[j],
    ...shuffledArray.slice(i + 1, j),
    shuffledArray[i],
    ...shuffledArray.slice(j + 1),
    ]);
    setMoves(moves + 1);
};

return (
    <div className="p-8 flex bg-yellow-200 text-gray-950 rounded-md">
    <div className="mx-auto">
        {win && (
        <div className="rounded-md border-l-4 border-green-500 bg-green-100 p-2 mb-2">
            <div className="flex items-center justify-center space-x-4">
            <p className="font-medium text-green-600">
                Felicidades! Has completado el juego
            </p>
            </div>
        </div>
        )}
        <p className="m-0 text-3xl text-gray-600 font-bold text-center">
        Fuente: GeeksforGeeks
        </p>
        <h3 className="text-xl font-bold 
        text-center bg-clip-text 
        text-transparent bg-gradient-to-r 
        from-indigo-500 from-10% via-sky-500 
        via-30% to-emerald-500 to-90%">
        Puzzle
        </h3>
        <div className="flex justify-between px-6 mt-2">
        <p>Movimientos: {moves}</p>
        <Timer time={time} timerActive={timerActive} setTime={setTime} />
        </div>
        <Puzzle shuffledArray={shuffledArray} 
                dragStart={dragStart} 
                dragOver={dragOver} dropped={dropped}/>

    </div>
    </div>
);
}
