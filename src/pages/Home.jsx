import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-6">Bem-vindo!</h1>
      <p className="mb-4">Clique abaixo para ver um conselho aleatório:</p>
      <Link to="/advice">
        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:bg-gray-200 transition">
          Ver Conselho
        </button>
      </Link>
    </div>
  );
}

export default Home;
