import { Link, useLocation } from 'react-router-dom';

export default function SideMenu() {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/games', icon: '🎮', label: 'Games' },
    { path: '/profile', icon: '👤', label: 'Profile' }
  ];

  return (
    <aside className="w-64 bg-gray-100 p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6 text-center">Navigation</h2>
      <nav>
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`flex items-center p-2 rounded transition-colors ${
                  location.pathname === item.path 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-gray-200'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}