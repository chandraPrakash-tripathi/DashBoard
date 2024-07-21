import React from 'react';

interface EmployeeSearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const EmployeeSearch: React.FC<EmployeeSearchProps> = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <div>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search employees..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default EmployeeSearch;
