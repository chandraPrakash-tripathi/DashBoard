import React, { useState } from 'react';
import axios from 'axios';
import CPButton from './CPButton';

interface SignupFormProps {
  onSignup: (username: string, password: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [designation, setDesignation] = useState<string>('developer');
  const [gender, setGender] = useState<string>('male');
  const [courses, setCourses] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/signup', {
        username,
        password,
        name,
        email,
        mobile,
        designation,
        gender,
        courses: courses.split(',').map(course => course.trim())
      });
      onSignup(username, password);
      console.log(response.data);
    } catch (error) {
      setError('Signup failed');
      console.error('Signup error', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <div className="grid grid-cols-1 items-center justify-center gap-3">
          <div className="flex flex-row items-center justify-center gap-2">
            <p>Username:</p>
            <input
              type="text"
              placeholder="Username"
              className="w-2/12 border-2 border-black rounded-md placeholder:px-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <p>Password:</p>
            <input
              type="password"
              placeholder="Password"
              className="w-2/12 border-2 border-black rounded-md placeholder:px-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <p>Name:</p>
            <input
              type="text"
              placeholder="Name"
              className="w-2/12 border-2 border-black rounded-md placeholder:px-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <p>Email:</p>
            <input
              type="email"
              placeholder="Email"
              className="w-2/12 border-2 border-black rounded-md placeholder:px-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <p>Mobile:</p>
            <input
              type="text"
              placeholder="Mobile"
              className="w-2/12 border-2 border-black rounded-md placeholder:px-2"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <p>Designation:</p>
            <select
              className="w-2/12 border-2 border-black rounded-md placeholder:px-2"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option value="manager">Manager</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
            </select>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <p>Gender:</p>
            <select
              className="w-2/12 border-2 border-black rounded-md placeholder:px-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <p>Courses:</p>
            <input
              type="text"
              placeholder="Courses (comma separated)"
              className="w-2/12 border-2 border-black rounded-md placeholder:px-2"
              value={courses}
              onChange={(e) => setCourses(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <CPButton text="Sign Up" />
          </div>
          {error && (
            <div className="text-red-500 text-center">
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
