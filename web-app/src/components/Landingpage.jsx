import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

function calculateQuartiles(data) {
  const sortedData = data.sort((a, b) => a - b);
  const n = sortedData.length;
  return [
    sortedData[Math.floor(n * 0.25)], // first quartile (Q1)
    sortedData[Math.floor(n / 2)], // median (Q2)
    sortedData[Math.floor(n * 0.75)], // third quartile (Q3)
  ];
}

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [averageSalary, setAverageSalary] = useState(0);
  const navigate = useNavigate();
  const ageDistributionChartRef = useRef(null);
  const departmentChartRef = useRef(null);
  const salaryRangeChartRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);

        const totalEmployeesCount = data.length;
        setTotalEmployees(totalEmployeesCount);

        const calculateAverageSalary = () => {
          if (totalEmployeesCount === 0) return 0;

          const totalSalary = data.reduce((accumulator, employee) => {
            return accumulator + employee.Salary;
          }, 0);

          return (totalSalary / totalEmployeesCount).toFixed(2);
        };

        const averageSalaryValue = calculateAverageSalary();
        setAverageSalary(averageSalaryValue);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  useEffect(() => {
    createAgeDistributionChart();
    createDepartmentEmployeeCountChart();
    createSalaryRangeDistributionChart();
  }, [employees]);

  // Function to create Age Distribution Histogram
  const createAgeDistributionChart = () => {
    const ages = employees.map((employee) => employee.Age);

    const uniqueAges = [...new Set(ages)]; // Get unique ages

    const ageCounts = uniqueAges.reduce((acc, age) => {
      acc[age] = ages.filter((a) => a === age).length; // Count occurrences of each age
      return acc;
    }, {});

    const labels = Object.keys(ageCounts);
    const data = Object.values(ageCounts);

    if (ageDistributionChartRef.current) {
      if (ageDistributionChartRef.current.chart) {
        ageDistributionChartRef.current.chart.destroy(); // Destroy existing chart if it exists
      }

      const ctx = ageDistributionChartRef.current.getContext('2d');
      ageDistributionChartRef.current.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Age Distribution',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.5)', // Adjust color as needed
              borderColor: 'rgba(54, 162, 235, 1)', // Adjust color as needed
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Employees',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Age',
              },
            },
          },
        },
      });
    }
  };



  // Function to create Department Employee Count Pie Chart or Bar Chart
const createDepartmentEmployeeCountChart = () => {
  const departments = {}; // Object to store department-wise employee counts

  employees.forEach((employee) => {
    if (departments[employee.Department]) {
      departments[employee.Department]++;
    } else {
      departments[employee.Department] = 1;
    }
  });

  const labels = Object.keys(departments);
  const data = Object.values(departments);

  if (departmentChartRef.current) {
    if (departmentChartRef.current.chart) {
      departmentChartRef.current.chart.destroy(); // Destroy existing chart if it exists
    }

    const ctx = departmentChartRef.current.getContext('2d');
    departmentChartRef.current.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Department Employee Count',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.5)', // Adjust color as needed
            borderColor: 'rgba(255, 99, 132, 1)', // Adjust color as needed
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Employees',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Department',
            },
          },
        },
      },
    });
  }
};


    // Function to create Salary Range Distribution Boxplot
    // Function to create Salary Range Distribution Boxplot
const createSalaryRangeDistributionChart = () => {
  const salaries = employees.map((employee) => employee.Salary);

  // Calculate quartiles for the entire salary range
  const quartilesData = calculateQuartiles(salaries);
  const [Q1, median, Q3] = quartilesData;

  const minSalary = Math.min(...salaries);
  const maxSalary = Math.max(...salaries);

  const interQuartileRange = Q3 - Q1;
  const lowerWhisker = Math.max(minSalary, Q1 - 1.5 * interQuartileRange);
  const upperWhisker = Math.min(maxSalary, Q3 + 1.5 * interQuartileRange);

  const outliers = salaries.filter(
    (salary) => salary < lowerWhisker || salary > upperWhisker
  );

  if (salaryRangeChartRef.current && salaryRangeChartRef.current.chart) {
    salaryRangeChartRef.current.chart.destroy();
  }

  const ctx = salaryRangeChartRef.current.getContext('2d');
  salaryRangeChartRef.current.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Salary Range'],
      datasets: [
        {
          label: 'Salary Distribution',
          data: [minSalary, lowerWhisker, Q1, median, Q3, upperWhisker, maxSalary],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
        {
          type: 'scatter',
          label: 'Outliers',
          data: outliers.map((salary, index) => ({ x: 0, y: salary })),
          backgroundColor: 'rgba(255, 99, 132, 1)',
          pointRadius: 5,
          showLine: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          title: {
            display: true,
            text: 'Salary',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Salary Range',
          },
        },
      },
    },
  });
};

    
    
    
    
    return (
      <div className="container" style={{ textAlign: 'center', background: "#d3d3d3" }}>
        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', }}>
          <h1 style={{ marginTop: "0" }}>Employee Dashboard</h1>
          <button style={{ marginRight: "0" }} onClick={() => navigate('/View')}>View Employee</button>
        </div>
        <div className="dashboard">
          {/* Display key metrics */}
          <div className="key-metrics" style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', marginRight: '10%', marginLeft: '10%' }}>
            <h3>Total Employees:{totalEmployees}</h3>
            {/* Calculate and display average salary */}
            <h3>Average Salary:{averageSalary} {/* Logic to calculate average salary */}</h3>
            {/* Add more key metrics as needed */}
          </div>

          {/* Display charts */}
          <div className="charts" >
            <div className="chart-container" style={{ width: '50%', margin: '0 auto' }}>
              <h2>Age Distribution</h2>
              <canvas ref={ageDistributionChartRef} style={{ width:'100%' }}></canvas>
            </div>

            <div className="chart-container" style={{ width: '50%', margin: '0 auto' }}>
              <h2>Department Employee Count</h2>
              <canvas ref={departmentChartRef} style={{ width:'100%' }}></canvas>
            </div>

            <div className="chart-container" style={{ width: '50%', margin: '0 auto' }}>
              <h2>Salary Range Distribution</h2>
              <canvas ref={salaryRangeChartRef} style={{ width:'100%' }}></canvas>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Home;
