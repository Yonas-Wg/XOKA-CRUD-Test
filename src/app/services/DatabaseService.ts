export interface Employee {
  id: string;
  name: string;
  company: string;
  department: string;
  salary: number;
  departmentId: string;
  companyId: string;
  salaryId: string;
  
}

export interface Department {
  id: string;
  name: string;
}

export interface Salary {
  id: string;
  amount: number;
}

export interface Company {
  id: string;
  name: string;
}

export interface Candidate {
  id: string;
  name: string;
  appliedPosition: string;
  status: string;
}

class DatabaseService {
  private employees: Employee[] = [];
  private candidates: Candidate[] = [];

  // Employee CRUD operations
  getEmployees(): Employee[] {
    return this.employees;
  }

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  updateEmployee(id: string, updatedEmployee: Partial<Employee>): Employee[] {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index === -1) {
      console.error(`Employee with ID ${id} not found!`);
      return this.employees; 
    }
  
    // Perform the update and log it
    const updatedEmployeeList = [
      ...this.employees.slice(0, index),
      { ...this.employees[index], ...updatedEmployee },
      ...this.employees.slice(index + 1)
    ];
 
    this.employees = updatedEmployeeList;  
    return updatedEmployeeList;  
  }
  
  deleteEmployee(id: string): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
  }

  // Candidate CRUD operations
  getCandidates(): Candidate[] {
    return this.candidates;
  }

  addCandidate(candidate: Candidate): void {
    this.candidates.push(candidate);
  }

  updateCandidate(id: string, updatedCandidate: Partial<Candidate>): void {
    const index = this.candidates.findIndex(cand => cand.id === id);
    if (index !== -1) {
      this.candidates[index] = { ...this.candidates[index], ...updatedCandidate };
    }
  }

  deleteCandidate(id: string): void {
    this.candidates = this.candidates.filter(cand => cand.id !== id);
  }
}

export const dbService = new DatabaseService();
