import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const View = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
      })
      .catch(err => {
        console.error('Error fetching employees:', err);
      });
  }, []);

  function handleView(employeeId) {
    navigate('/Profile', { state: { employeeId } });
  };

  const totalPages = Math.ceil(employees.length / rowsPerPage);

  const offset = currentPage * rowsPerPage;
  const currentPageEmployees = employees.slice(offset, offset + rowsPerPage);

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div style={{ textAlign: 'center', height: '100vh', background: '#d3d3d3' }}>
      <h1 style={{marginTop:"0"}}>Employee List</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <table style={{ border: '1px solid #000', background: 'white', width: '80%' }}>
          {/* Table Header */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {currentPageEmployees.map((employee, index) => (
              <tr key={employee._id} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f0f0f0' }}>
                <td>{offset+index + 1}</td>
                <td>{employee.Name}</td>
                <td>{employee.Department}</td>
                <td>{employee.Position}</td>
                <td>{employee.Salary}</td>
                <td>
                  <button onClick={() => handleView(employee._id)} >View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <span>Rows per page:</span>
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <button onClick={goToPrevPage} disabled={currentPage === 0}>
          Previous Page
        </button>
        <button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default View;
