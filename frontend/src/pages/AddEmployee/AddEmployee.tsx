import React from "react";
import Navbar from "../../components/Navbar";

import AccountCreationForm from "../../components/AccountCreationForm";
const AddEmployee: React.FC = () => {
  const navItems = [
    { name: "Home", path: "/home" },
    {name: "Create Employee", path: "/createemployee"},
    { name: "Employee List", path: "/employeelist" },
  ];
  return (
    <div>
      <div>
        <Navbar items={navItems} isLoggedin={false} />
      </div>

      <div className="flex bg-yellow-200 px-2">Create Employee</div>
      <div className="mt-40 text-center">
        <div className="flex items-center justify-center">
          <AccountCreationForm />
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
