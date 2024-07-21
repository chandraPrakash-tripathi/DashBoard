import React from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from '../../AuthContext';
const HomePage: React.FC = () => {
  const { isAuthenticated, userName } = useAuth();
  const navItems = [
    { name: "Home", path: "/home" },
    {name: "Create Employee", path: "/createemployee"},
    { name: "Employee List", path: "/employeelist" },
  ];
  return (
    <div>
      <div>
        <Navbar items={navItems} userName={userName} isLoggedin={isAuthenticated} />
      </div>

      <div className="flex bg-yellow-200 px-2">Dashboard</div>
      <div className="mt-40 text-center">
        <p>Welcome To Admin Panel</p>
      </div>
    </div>
  );
};

export default HomePage;
