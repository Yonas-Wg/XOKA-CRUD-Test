import axios from 'axios';
import { Employee } from '../services/DatabaseService'; 
import { v4 as uuidv4 } from 'uuid';  

const API_URL = 'http://localhost:3000/employees'; 

// Fetch all employees
export const getEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(API_URL);
  return response.data;
  console.log('Employees fetched:', response.data);
};

// Add a new employee with generated UUID for id
export const addEmployee = async (employee: Employee): Promise<Employee> => {
    const newEmployee = { ...employee, id: uuidv4() };
    try {
      const response = await axios.post(API_URL, newEmployee);
      console.log('Employee added:', response.data); 
      return response.data; 
    } catch (error) {
      console.error('Error adding employee:', error); 
      throw error;  
    }
  };

// Update an existing employee
export const updateEmployee = async (id: string, employee: Employee): Promise<Employee> => {
  const response = await axios.put(`${API_URL}/${id}`, employee);
  return response.data;
};

// Delete an employee
export const deleteEmployee = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
