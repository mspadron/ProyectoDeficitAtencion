import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    //refrescar la pagina cuando se cambia
    const refreshPage = () => {
        window.location.reload();
    }

  return (
    <div className="bg-blue-500 p-4 text-white">
      <nav className="max-w-6xl mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Proyecto Déficit de Atención</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/test-d2" className="hover:text-gray-200">Test d2</Link>
          </li>
          <li>
            <Link to="/emotion-detection" className="hover:text-gray-200">Detector de Emociones</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
