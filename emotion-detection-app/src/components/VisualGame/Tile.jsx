// Tile.js

export function FilledTile({index, value, dragStart}) {
    return (
        <div
        id={`place-${index + 1}`}
        className={
            "shadow w-20 h-20 rounded " +
            (index == value - 1
            ? "bg-gradient-to-r from-blue-500 to-blue-400"
            : "bg-gray-200")
        }
        >
        <p
            id={`tile-${value}`}
            draggable="true"
            onDragStart={dragStart}
            className="fw-bold text-xl 
            grid grid-cols-1 place-items-center 
            w-20 h-20 rounded cursor-pointer 
            hover:bg-gray-300"
        >
            {value}
        </p>
        </div>
    );
    }
    
    export function EmptyTile({dragOver, dropped, index}) {
    return (
        <div
        onDragOver={dragOver}
        onDrop={dropped}
        id={`place-${index + 1}`}
        className="bg-yellow-100 shadow w-20 h-20 rounded"
        ></div>
    );
    }
    