import express from "express";
import { EmployeeModel } from "../db/employee";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

class EmployeeController {
  getAllEmployee = async (request: express.Request, response: express.Response) => {
    try {
      const employees = await EmployeeModel.find();
      return response.status(200).json({ data: employees });
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  };
  getEmployee = async (request: express.Request, response: express.Response) => {
    try {
      const { id } = request.params;
      
      const employee = await EmployeeModel.findById(id);
      
      if (employee) {
        return response.status(200).json({ data: employee });
      }
      
      return response.status(404).json({ error: "Employee not found" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  };
  

  createEmployee = [
    upload.single('image'),  
    async (request: express.Request, response: express.Response) => {
      try {
        const { name, email, mobile, designation, gender, courses } = request.body;
        const imageUrl = request.file ? `/uploads/${request.file.filename}` : '';

        const employee = new EmployeeModel({
          name,
          email,
          mobile,
          designation,
          gender,
          courses: JSON.parse(courses),
          imageUrl
        });

        await employee.save();
        return response.status(201).json({ message: "Employee Created", data: employee });
      } catch (error) {
        console.error(error);
        return response.status(400).json({ error: "Bad Request" });
      }
    }
  ];

  updateEmployee = [
    upload.single('image'),
    async (request: express.Request, response: express.Response) => {
      try {
        const { id } = request.params;
        const { name, email, mobile, designation, gender, courses } = request.body;
        const imageUrl = request.file ? `/uploads/${request.file.filename}` : undefined;

        const employee = await EmployeeModel.findById(id);
        if (employee) {
          employee.name = name || employee.name;
          employee.email = email || employee.email;
          employee.mobile = mobile || employee.mobile;
          employee.designation = designation || employee.designation;
          employee.gender = gender || employee.gender;
          employee.courses = courses ? JSON.parse(courses) : employee.courses;
          if (imageUrl) employee.imageUrl = imageUrl;

          await employee.save();
          return response.status(200).json({ message: "Employee Updated", data: employee });
        }
        return response.status(404).json({ error: "Employee not found" });
      } catch (error) {
        console.error(error);
        return response.status(400).json({ error: "Bad Request" });
      }
    }
  ];

  deleteEmployee = async (request: express.Request, response: express.Response) => {
    try {
      const { id } = request.params;
      const result = await EmployeeModel.findByIdAndDelete(id);
      if (result) {
        return response.status(200).json({ message: "Employee Deleted" });
      }
      return response.status(404).json({ error: "Employee not found" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  };
  searchEmployeesByName = async (request: express.Request, response: express.Response) => {
    try {
      const { name } = request.query;
      
      if (!name || typeof name !== 'string') {
        return response.status(400).json({ error: "Name query parameter is required" });
      }

      const employees = await EmployeeModel.find({
        name: { $regex: name, $options: 'i' }
      });

      return response.status(200).json({ data: employees });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  };
  signup = async (request: express.Request, response: express.Response) => {
    const { username, password, name, email, mobile, designation, gender, courses, imageUrl } = request.body;
    try {
      const existingEmployee = await EmployeeModel.findOne({ email });
      if (existingEmployee) {
        return response.status(400).json({ message: 'Email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newEmployee = new EmployeeModel({
        username,
        password: hashedPassword,
        name,
        email,
        mobile,
        designation,
        gender,
        courses,
        imageUrl
      });
      await newEmployee.save();
      return response.status(201).json({ message: 'Employee registered successfully' });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Server error', error });
    }
  };

  login = async (request: express.Request, response: express.Response) => {
    const { email, password } = request.body;
    let username= email
    try {
      const employee = await EmployeeModel.findOne({ username });
      if (!employee) {
        return response.status(400).json({ message: 'Invalid email or password' });
      }
      const isMatch = await bcrypt.compare(password, employee.password);
      if (!isMatch) {
        return response.status(400).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign({ id: employee._id }, 'your_jwt_secret', { expiresIn: '1h' });
      return response.status(200).json({ token, employee });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Server error', error });
    }
  };
}

export default new EmployeeController();