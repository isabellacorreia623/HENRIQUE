import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-5xl font-extrabold">Bem-vindo!</h1>
        <p className="text-lg">Clique abaixo para ver um conselho aleatório:</p>
        <Link to="/advice">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:bg-gray-200 transition duration-200">
            Ver Conselho
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
