/**
 * Renders the employee list component using React components.
 *
 * @component
 * @returns {JSX.Element}
 */
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import mockDataEmployees from '../mockDataEmployees.json';

const EmployeeList = () => {
   /**
   * Represents the search term used for filtering employees.
   * @typedef {string} SearchTerm
   */
  const reduxEmployees = useSelector((state) => state.employees);
  const employees = [...mockDataEmployees, ...reduxEmployees];
  console.log(employees)
  const [searchTerm, setSearchTerm] = useState('');

  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

    /**
   * Filters the employees based on the current search term.
   *
   * @function
   * @returns {Array<Object>} An array of filtered employee objects.
   */
  const filteredData = () => {
    if (searchTerm === '') {
      return employees;
    }
    const term = searchTerm.toLowerCase();
    return employees.filter((employee) => {
      const employeeData = Object.values(employee).map((value) =>
        typeof value === 'string' ? value.toLowerCase() : ''
      );
      return employeeData.some((data) => data.includes(term));
    });
  };


  const customPaginationOptionsPerPage = [10, 25, 50, 100];

  const columns = [
    { name: 'First Name', selector: (row) => row.firstName, sortable: true },
    { name: 'Last Name', selector: (row) => row.lastName, sortable: true },
    { name: 'Start Date', selector: (row) => row.startDate, sortable: true },
    { name: 'Department', selector: (row) => row.department, sortable: true },
    { name: 'Date of Birth', selector: (row) => row.dateOfBirth, sortable: true },
    { name: 'Street', selector: (row) => row.street, sortable: true },
    { name: 'City', selector: (row) => row.city, sortable: true },
    { name: 'State', selector: (row) => row.state, sortable: true },
    { name: 'Zip Code', selector: (row) => row.zipCode, sortable: true },
  ];

  return (
    <div className="container">
      <h1>Current Employees</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {employees.length > 0 ? (
        <DataTable 
        columns={columns} 
        data={filteredData()} 
        pagination 
        responsive 
        paginationRowsPerPageOptions={customPaginationOptionsPerPage} 
        />
      ) : (
        <span>No employees</span>
      )}
      <Link to="/" className="btn btn-primary">
        Create Employee
      </Link>
    </div>
  );
};

export default EmployeeList;
