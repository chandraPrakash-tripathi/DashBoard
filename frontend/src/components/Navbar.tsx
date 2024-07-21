import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface NavItem {
  name: string;
  path: string;
}

interface NavbarProps {
  items: NavItem[];
  userName?: string|null;
  isLoggedin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ items, userName, isLoggedin }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-blue-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4 items-center justify-between">
          {items.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.path} 
                className="text-black hover:text-gray-800 font-bold text-center px-12"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {isLoggedin && (
          <div className='flex flex-row gap-2'>
            <p>{userName}</p>
            <button
              onClick={handleLogout}
              className='border-2 bg-black text-white px-1 rounded-md'
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
