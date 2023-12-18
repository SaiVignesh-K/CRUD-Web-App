import React from "react";
import { useState } from "react";

const CreateUser = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [department, setDepartment] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [contact, setContact] = useState("");

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
        fetch("http://localhost:3001/AddEmployee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the server if needed
                console.log("User added:", data);
                // Optionally, you can reset the form fields after successful submission
                setName("");
                setAge("");
                setDepartment("");
                setPosition("");
                setSalary("");
                setContact("");
            })
            .catch((error) => {
                console.error("Error:", error);
                // Handle errors if any
            });
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
            <div style={{ background: "white", border: "1px solid #000" }}>
                <form style={{padding:"10px"}} onSubmit={handleSubmit}>
                    <h2 style={{ textAlign: "center", margin:"0", marginBottom:"10px"}}>Add Employee</h2>

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
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;