import { useState, useEffect } from 'react';
import { Button, TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Department, Salary, Company, Employee } from '../services/DatabaseService';
import { addEmployee, updateEmployee } from '../services/EmployeeApiService';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  company: Yup.string().required('Company is required'),
  department: Yup.string().required('Department is required'),
  salary: Yup.string().required('Salary is required'),
});

interface EmployeeFormProps {
  form: Employee;
  setForm: React.Dispatch<React.SetStateAction<Employee>>;
  isEdit: boolean;
  handleAddEmployee: (values: Employee) => void;
  handleUpdateEmployee: (values: Employee) => void;
  departments: Department[];
  salaries: Salary[];
  companies: Company[];
}

const EmployeeForm = ({ form, setForm, isEdit, handleAddEmployee, handleUpdateEmployee, departments, salaries, companies }: EmployeeFormProps) => {
  return (
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
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeForm;
