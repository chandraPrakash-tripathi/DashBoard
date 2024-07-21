import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../../components/UserTable';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import EmployeeSearch from '../../components/EmployeeSearch';
import EditEmployeePage from '../EditEmployeePAge/EditEmployeePage';
interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  designation?: string;
  gender?: string;
  courses?: string[];
  imageUrl?: string;
  createdAt: string;  
} 

const ViewEmployees: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);

    useEffect(() => {
      const fetchEmployees = async () => {
          try {
              const response = await axios.get('http://localhost:8000/employee');
              const formattedUsers = response.data.data.map((user: User) => ({
                  ...user,
                  createdAt: new Date(user.createdAt).toLocaleDateString()  
              }));
              setUsers(formattedUsers);
              setLoading(false);
          } catch (err) {
              setError('Failed to fetch employees');
              setLoading(false);
          }
      };
  
      fetchEmployees();
  }, []);

  const handleEdit = (user: User) => {
    setEditingEmployeeId(user._id);
  };

    const handleDelete = async (userId: string) => {
        try {
            await axios.delete(`http://localhost:8000/employee/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (err) {
            console.error('Failed to delete employee:', err);
        }
    };
    const handleSearch = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/employees/search?name=${encodeURIComponent(searchTerm)}`);
          setSearchResults(response.data.data);
        } catch (error) {
          console.error('Error searching employees:', error);
        }
      };

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Create Employee", path: "/createemployee" },
        { name: "Employee List", path: "/employeelist" },
    ];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (editingEmployeeId) {
        return <EditEmployeePage id={editingEmployeeId} />;
      }
    const displayedUsers = searchResults.length > 0 ? searchResults : users;
    return (
        <div>
            <div className='mb-10'>
                <Navbar items={navItems} isLoggedin={false} />
            </div>
            <div className="flex justify-end mt-6 mr-5">
            <div className="mt-4 mb-2">
        <h2>Total Employees: {displayedUsers.length}</h2>
      </div>
            <EmployeeSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
              <Link to={"/createemployee"}>
              <button className="w-full bg-green-300 rounded-md px-2">Create Employee</button>
              </Link>
                
            </div>
            <UserTable 
                users={searchResults.length > 0 ? searchResults : users} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
            />
        </div>
    );
};

export default ViewEmployees;