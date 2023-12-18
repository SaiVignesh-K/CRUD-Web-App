import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeId = location.state.employeeId;
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const salaryChartRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/GetUser/${employeeId}`)
      .then(response => response.json())
      .then(data => {
        setEmployee(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching employee:', err);
        setIsLoading(false);
      });
  }, [employeeId]);

  useEffect(() => {
    if (employee && document.getElementById('salaryChart')) {
      if (salaryChartRef.current) {
        salaryChartRef.current.destroy();
      }

      salaryChartRef.current = new Chart(document.getElementById('salaryChart'), {
        type: 'bar',
        data: {
          labels: ['Salary'],
          datasets: [
            {
              label: 'Employee Salary',
              data: [employee.Salary],
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [employee]);

  const handleEdit = () => {
    console.log('Edit button clicked');
  };

  const handleDelete = () => {
    console.log('Delete button clicked');
  };

  const handleBack = () => {
    navigate('/view', { state: { employeeId } }); // Replace `/view` with your actual view route
  };

  if (isLoading) {
    return <p>Loading employee profile...</p>;
  }

  return (
    <div className="container mt-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#d3d3d3' }}>
      {employee && (
        <div className="card" style={{ background: 'white', border: '1px solid #000', padding: '20px' }}>
          <div className="card-body">
            <div className="d-flex align-items-center">
              <button className="btn btn-outline-primary me-2" onClick={handleBack}>
                <i className="bi bi-arrow-left"></i> Back
              </button>
              <h2 className="card-title" style={{ textAlign: 'center' }}>{employee.Name}</h2>
            </div>
            <p className="card-text">Age: {employee.Age}</p>
            <p className="card-text">Department: {employee.Department}</p>
            <p className="card-text">Position: {employee.Position}</p>
            <p className="card-text">Contact: {employee.Contact}</p>

            <div className="mt-4">
              <canvas id="salaryChart" width="400" height="200"></canvas>
            </div>

            <div className="mt-4">
              <button className="btn btn-primary me-2" onClick={handleEdit}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
