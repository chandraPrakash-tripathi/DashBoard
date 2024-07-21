import React, { useState, useEffect } from "react";
import axios from "axios";

interface EditEmployeeProps {
  employeeId: string;
}

interface Employee {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  courses: string[];
  imageUrl: string;
}

const EditEmployee: React.FC<EditEmployeeProps> = ({ employeeId }) => {
  const [formData, setFormData] = useState<Employee>({
    _id: "",
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/employee/${employeeId}`);
        setFormData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch employee data');
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, courses: [...formData.courses, value] });
    } else {
      setFormData({ ...formData, courses: formData.courses.filter(course => course !== value) });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, imageUrl: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'courses') {
        data.append(key, JSON.stringify(value));
      } else if (key === 'imageUrl' && value instanceof File) {
        data.append('image', value);
      } else if (key !== '_id') {
        data.append(key, value as string);
      }
    });
    console.log(employeeId,"idddd")
    try {
      const response = await axios.put(`http://localhost:8000/employee/${employeeId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Employee updated:', response.data);
      // Show success message or redirect
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Failed to update employee');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-row justify-center items-center w-3/5">
      <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-md w-96">
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Name:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="border-2 rounded-md p-2"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border-2 rounded-md p-2"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Mobile No:</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Mobile Number"
              className="border-2 rounded-md p-2"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Designation:</label>
            <select 
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="border-2 rounded-md p-2"
              required
            >
              <option value="">Select Designation</option>
              <option value="manager">Manager</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Gender:</label>
            <div className="flex space-x-4">
              {["male", "female", "other"].map((gender) => (
                <label key={gender} className="flex items-center">
                  <input 
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleInputChange}
                    className="mr-1"
                    required
                  />
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Courses:</label>
            <div className="flex flex-row gap-2">
              {["react", "node", "python"].map((course) => (
                <label key={course} className="flex items-center">
                  <input 
                    type="checkbox"
                    name="courses"
                    value={course}
                    checked={formData.courses.includes(course)}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  {course.charAt(0).toUpperCase() + course.slice(1)}
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Profile Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border-2 rounded-md p-2"
            />
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt="Profile" className="mt-2 w-32 h-32 object-cover" />
            )}
          </div>
          
          <div className="flex justify-center mt-6">
            <button type="submit" className="w-4/12 bg-blue-500 text-white rounded-md py-2">Update Employee</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;