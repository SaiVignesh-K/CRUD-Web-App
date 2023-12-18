import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const employeeId = location.state.employeeId;

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [department, setDepartment] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [contact, setContact] = useState("");

    useEffect(() => {
        // Fetch existing employee data based on employeeId
        fetch(`http://localhost:3001/GetUser/${employeeId}`)
            .then(response => response.json())
            .then(data => {
                // Set the form fields with existing employee data
                setName(data.Name);
                setAge(data.Age);
                setDepartment(data.Department);
                setPosition(data.Position);
                setSalary(data.Salary);
                setContact(data.Contact);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                // Handle errors if any
            });
    }, [employeeId]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Prepare data from the form
        const userData = {
            Name: name,
            Age: age,
            Department: department,
            Position: position,
            Salary: salary,
            Contact: contact,
        };

        // Make a POST request to add a new employee
        fetch(`http://localhost:3001/UpdateEmployee/${employeeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the server if needed
                console.log("User Updated:", data);
                navigate('/Profile', { state: { employeeId } });
            })
            .catch((error) => {
                console.error("Error:", error);
                // Handle errors if any
            });
    };

    const handleBack = () => {
        navigate('/Profile', { state: { employeeId } }); // Replace `/view` with your actual view route
      };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#d3d3d3"
            }}
        >
            <div style={{ background: "white", border: "1px solid #000",padding:"10px" }}>
            <button className="btn btn-outline-primary me-2"  onClick={handleBack}>
                <i className="bi bi-arrow-left"></i> Back
              </button>
                <form style={{padding:"10px"}} onSubmit={handleSubmit}>
                    <h2 style={{ textAlign: "center", margin:"0", marginBottom:"10px"}}>Update Employee</h2>

                    <div className="mb-2">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            required
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="age">Age:</label>
                        <input
                            type="number"
                            required
                            placeholder="Enter Age"
                            className="form-control"
                            value={age}
                            onChange={(event) => setAge(parseInt(event.target.value))} // convert string to number
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="department">Department:</label>
                        <input
                            type="text"
                            required
                            placeholder="Enter Department"
                            className="form-control"
                            value={department}
                            onChange={(event) => setDepartment(event.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="position">Position:</label>
                        <input
                            type="text"
                            required
                            placeholder="Enter Position"
                            className="form-control"
                            value={position}
                            onChange={(event) => setPosition(event.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="salary">Salary:</label>
                        <input
                            type="number"
                            required
                            min={0}
                            placeholder="Enter Salary"
                            className="form-control"
                            value={salary}
                            onChange={(event) => setSalary(parseInt(event.target.value))} // convert string to number
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="contact">Contact:</label>
                        <input
                            type="number"
                            required
                            placeholder="Enter Mobile Number"
                            className="form-control"
                            value={contact}
                            onChange={(event) => setContact(parseInt(event.target.value))}
                        />
                    </div>
                    <button className="btn btn-success" type="submit">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;