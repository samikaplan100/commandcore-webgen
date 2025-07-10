import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="mr-2">🐧</span>
          Penguin Gamers
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/games" className="hover:underline">Games</Link></li>
            <li><Link to="/profile" className="hover:underline">Profile</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}