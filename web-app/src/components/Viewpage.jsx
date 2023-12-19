import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const View = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(data => {
        setEmployees(data.reverse());
      })
      .catch(err => {
        console.error('Error fetching employees:', err);
      });
  }, []);

  const handleSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const filteredEmployees = employees.filter(employee => {
    return (
      employee.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Salary.toString().includes(searchTerm.toLowerCase())
    );
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedEmployees.length / rowsPerPage);

  const offset = currentPage * rowsPerPage;
  const currentPageEmployees = sortedEmployees.slice(offset, offset + rowsPerPage);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div style={{ textAlign: 'center', height: '100vh', background: '#d3d3d3' }}>
      <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', }}>
          <h1 style={{ marginTop: "0" }}>Employee List</h1>
          <button style={{ marginRight: "0" }} onClick={() => navigate('/')}>Employee dashboard</button>
        </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '10%', marginLeft: '10%', marginBottom: '10px' }}>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ padding: '5px' }}
          />
        </div>
        <div>
          <button onClick={() => navigate('/CreateUser')}>Add Employee</button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <table style={{ border: '1px solid #000', background: 'white', width: '80%' }}>
          <thead>
            <tr>
              <th>#</th>
              <th
                onClick={() => handleSort('Name')}
                style={{ position: 'relative', cursor: 'pointer' }}
                title="Click to sort"
              >
                Name{' '}
                <span
                  style={{
                    cursor: 'pointer',
                  }}
                  title="Click to sort"
                >
                  ?
                </span>
                {sortConfig.key === 'Name' && (
                  <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th>Department</th>
              <th
                onClick={() => handleSort('Salary')}
                style={{ position: 'relative', cursor: 'pointer' }}
                title="Click to sort"
              >
                Salary{' '}
                <span
                  style={{
                    cursor: 'pointer',
                  }}
                  title="Click to sort"
                >
                  ?
                </span>
                {sortConfig.key === 'Salary' && (
                  <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageEmployees.map((employee, index) => (
              <tr key={employee._id} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f0f0f0' }}>
                <td>{offset + index + 1}</td>
                <td>{employee.Name}</td>
                <td>{employee.Department}</td>
                <td>{employee.Salary}</td>
                <td>{employee.Position}</td>
                <td>
                  <button onClick={() => navigate('/Profile', { state: { employeeId: employee._id } })}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '10%', marginLeft: '10%', marginTop: '10px' }}>
        <div>
          <span>Rows per page:</span>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
        <div>
          <button onClick={goToPrevPage} disabled={currentPage === 0}>
            Previous Page
          </button>
          <button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
