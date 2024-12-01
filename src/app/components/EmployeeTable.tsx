import { useState, useEffect } from 'react';
import { Button, TextField, Avatar, Card, Typography, Box, Grid, IconButton, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Search as SearchIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../services/EmployeeApiService'; 
import { Employee, Department, Salary, Company } from '../services/DatabaseService';
import { useMediaQuery } from '@mui/material';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  company: Yup.string().required('Company is required'),
  department: Yup.string().required('Department is required'),
  salary: Yup.string().required('Salary is required'),
});

const EmployeeTable = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState<Employee>({
    id: '',
    name: '',
    company: '',
    department: '',
    salary: 0,
    departmentId: '', 
    companyId: '', 
    salaryId: '', 
  });
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'name' | 'salary'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const isMobile = useMediaQuery('(max-width: 768px)'); 

const getCompanyNameById = (companyId: string) => {
  const company = companies.find((company) => company.id === companyId);
  return company ? company.name : 'Unknown';
};

// Function to get the department name by its ID
const getDepartmentNameById = (departmentId: string) => {
  const department = departments.find((department) => department.id === departmentId);
  return department ? department.name : 'Unknown';
};

// Function to get the salary amount by its ID
const getSalaryAmountById = (salaryId: string) => {
  const salary = salaries.find((salary) => salary.id === salaryId);
  return salary ? `$${salary.amount}` : 'Unknown';
};



  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      const employeesFromApi = await getEmployees();
      setEmployees(employeesFromApi);
    };
    fetchEmployees();
  }, []);

  const handleInputChange = (field: keyof Employee, value: any) => {
    setForm({ ...form, [field]: value });
  };

  useEffect(() => {
    setForm({
      id: '',
      name: '',
      company: '',
      department: '',
      salary: 0,
      departmentId: '', 
      companyId: '', 
      salaryId: '', 
    });
  }, [employees]);

  const handleAddEmployee = async (values: Employee) => {
    // Validate the required fields
    if (!values.name || !values.company || !values.department || values.salary <= 0) {
      alert('Please fill in all fields correctly before submitting.');
      return;
    }
  
    // Generate a new unique ID for the new employee
    const newEmployeeId = uuidv4();
  
    const newEmployee = { 
      ...values, 
      id: newEmployeeId, 
      companyId: values.company, 
      departmentId: values.department, 
      salaryId: values.salary.toString(), 
    };
  
    await addEmployee(newEmployee);
  
    // Fetch the updated list of employees
    const updatedEmployees = await getEmployees();
    setEmployees(updatedEmployees);
  
    setForm({
      id: '',
      name: '',
      company: '',
      department: '',
      salary: 0,
      departmentId: '', 
      companyId: '', 
      salaryId: '', 
    });
  };

  const handleUpdateEmployee = async (values: Employee) => {
    if (!values.id) {
      alert('No employee selected for update');
      return;
    }
  
    const updatedEmployeePayload = {
      id: values.id, 
      name: values.name, 
      companyId: values.company, 
      departmentId: values.department, 
      salaryId: values.salary.toString(), 
      salary: values.salary,  
      company: values.company, 
  department: values.name, 
    };
  
    // Call the API to update the employee with the correct ID and payload
    await updateEmployee(values.id, updatedEmployeePayload);
  
    // Fetch the updated list of employees
    const updatedEmployees = await getEmployees();
    setEmployees(updatedEmployees);
  
    setForm({
      id: '',
      name: '',
      company: '',
      department: '',
      salary: 0,
      departmentId: '',
      companyId: '', 
      salaryId: '', 
    });
    setIsEdit(false);
  };
  
  
  // Edit employee
  const handleEditEmployee = (emp: Employee) => {
    setForm(emp);
    setIsEdit(true);
  };

  // Delete employee
  const handleDeleteEmployee = async (id: string) => {
    await deleteEmployee(id);
    const updatedEmployees = await getEmployees();
    setEmployees(updatedEmployees);
  };

  // Sort employees by name or salary
  const handleSortChange = (field: 'name' | 'salary') => {
    const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter((emp) => {
    const department = emp.department || ''; 
    return (
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (sortOrder === 'asc') {
      return fieldA > fieldB ? 1 : -1;
    } else {
      return fieldA < fieldB ? 1 : -1;
    }
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);


  useEffect(() => {
    // Fetch data for department, salary, and company
    const fetchData = async () => {
      try {
        const departmentResponse = await fetch('http://localhost:3000/departments');
        const salaryResponse = await fetch('http://localhost:3000/salaries');
        const companyResponse = await fetch('http://localhost:3000/companies');

        const departmentData = await departmentResponse.json();
        const salaryData = await salaryResponse.json();
        const companyData = await companyResponse.json();

        setDepartments(departmentData);
        setSalaries(salaryData); 
        setCompanies(companyData); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 3, marginBottom: 20 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
        Manage Employees
      </Typography>

      <Formik
  initialValues={form}
  validationSchema={validationSchema}
  enableReinitialize={true}
  onSubmit={(values) => {
    isEdit ? handleUpdateEmployee(values) : handleAddEmployee(values);
  }}
>
  {({ values, errors, touched, handleChange, handleBlur }) => (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            fullWidth
            name="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.name && !!errors.name}
            helperText={touched.name && errors.name}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={touched.company && !!errors.company}>
            <InputLabel>Company</InputLabel>
            <Select
              label="Company"
              name="company"
              value={values.company || ''}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              {companies.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
            {touched.company && errors.company && <FormHelperText>{errors.company}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={touched.department && !!errors.department}>
            <InputLabel>Department</InputLabel>
            <Select
              label="Department"
              name="department"
              value={values.department || ''} 
              onBlur={handleBlur}
              onChange={handleChange}
            >
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
            {touched.department && errors.department && <FormHelperText>{errors.department}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={touched.salary && !!errors.salary}>
            <InputLabel>Salary</InputLabel>
            <Select
              label="Salary"
              name="salary"
              value={values.salary || ''}  
              onBlur={handleBlur}
              onChange={handleChange}
            >
              {salaries.map((salary) => (
                <MenuItem key={salary.id} value={salary.id}>
                  ${salary.amount}
                </MenuItem>
              ))}
            </Select>
            {touched.salary && errors.salary && <FormHelperText>{errors.salary}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>
            {isEdit ? 'Update Employee' : 'Add Employee'}
          </Button>
          <Button
  type="reset"
  variant="outlined"
  color="secondary"
  onClick={() => {
    setForm({
      id: '',
      name: '',
      company: '',
      department: '',
      salary: 0,
      departmentId: '', 
      companyId: '',
      salaryId: '',
    });
    setIsEdit(false); 
  }}
>
  Reset
</Button>
        </Grid>
      </Grid>
    </Form>
  )}
</Formik>

<Typography variant="h6" sx={{ mt: 10, color: 'primary.main' }}>
        Employees List :
      </Typography>

<Box 
      sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: 3, 
        gap: 2,  
      }}
    >
      <TextField
        variant="outlined"
        label="Search Employees"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
        sx={{ width: isMobile ? '100%' : 'auto' }} 
      />
      
      <Box sx={{ display: 'flex', gap: 2, marginTop: isMobile ? 2 : 0 }}>
        <Button onClick={() => handleSortChange('name')}>
          Sort by Name {sortOrder === 'asc' ? '↑' : '↓'}
        </Button>
        <Button onClick={() => handleSortChange('salary')}>
          Sort by Salary {sortOrder === 'asc' ? '↑' : '↓'}
        </Button>
      </Box>
    </Box>

      {/* Employee Table */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {sortedEmployees.map((emp) => (
          <Grid item xs={12} sm={6} md={4} key={emp.id}>
            <Card sx={{ padding: 2, boxShadow: 3 }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">{emp.name}</Typography>
                <div>
                  <IconButton onClick={() => handleEditEmployee(emp)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteEmployee(emp.id)}>
                    <DeleteIcon sx={{color:'red'}} />
                  </IconButton>
                </div>
              </Box>
              
              <Typography variant="body2">{getCompanyNameById(emp.companyId)}</Typography>
            <Typography variant="body2">{getDepartmentNameById(emp.departmentId)}</Typography>
            <Typography variant="body2">{getSalaryAmountById(emp.salaryId)}</Typography>
        
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EmployeeTable;
