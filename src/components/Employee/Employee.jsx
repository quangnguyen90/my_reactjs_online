import React from "react";

class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listEmployee: [],
            employee: {},
            employeeForUpdate: {},
            isOpenUpdate: false,
            error: {},
            isLoaded: false,
        };
    }

    // HANDE CHANGE FOR ADD
    handleChange = (e) => {
        this.setState({
            employee: { ...this.state.employee, [e.target.name]: e.target.value },
        });
    };

    // HANDE CHANGE FOR UPDATE
    handleChangeForUpdate = (e) => {
        this.setState({
            employeeForUpdate: { ...this.state.employeeForUpdate, [e.target.name]: e.target.value },
        });
    };

    // GET EMPLOYEE LIST
    componentDidMount() {
        this.setState({
            isLoaded: true
        });
        const apiUrl = 'http://dummy.restapiexample.com/api/v1/employees';
        const options = {
            method: 'GET',
        }
        fetch(apiUrl, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        listEmployee: result.data
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    // ADD
    handleAdd = () => {
        let apiUrl = 'http://dummy.restapiexample.com/api/v1/create';

        const dataSaveEmployee = {
            name: this.state.employee.employee_name,
            salary: this.state.employee.employee_salary,
            age: this.state.employee.employee_age,
        };

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const employeeData = JSON.stringify(dataSaveEmployee);
        const method = 'POST';

        const options = {
            method: method,
            body: employeeData,
            myHeaders
        };

        fetch(apiUrl, options)
            .then(res => res.json())
            .then(result => {
                const responseData = {
                    id: result.data.id,
                    employee_name: result.data.name,
                    employee_salary: result.data.salary,
                    employee_age: result.data.age,
                };
                this.setState({
                    listEmployee: [...this.state.listEmployee, responseData],
                });
            },
                (error) => {
                    this.setState({ error });
                }
            )
    };

    // DELETE
    handleDeleteItem = (employeeId) => () => {
        const apiUrl = `http://dummy.restapiexample.com/api/v1/delete/${employeeId}`;
        const options = {
            method: 'DELETE',
        }

        fetch(apiUrl, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        listEmployee: this.state.listEmployee.filter((employee) => employee.id !== employeeId),
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    };

    // UPDATE
    handleUpdate = () => {
        const employeeId = this.state.employeeForUpdate.id;
        let apiUrl = `http://dummy.restapiexample.com/api/v1/update/${employeeId}`;

        const dataUpdateEmployee = {
            name: this.state.employeeForUpdate.employee_name,
            salary: this.state.employeeForUpdate.employee_salary,
            age: this.state.employeeForUpdate.employee_age,
        };

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const employeeData = JSON.stringify(dataUpdateEmployee);
        const method = 'PUT';

        const options = {
            method: method,
            body: employeeData,
            myHeaders
        };

        fetch(apiUrl, options)
            .then(res => res.json())
            .then(result => {
                // const responseData = {
                //     id: result.data.id,
                //     employee_name: result.data.name,
                //     employee_salary: result.data.salary,
                //     employee_age: result.data.age,
                // };
                this.setState({
                    listEmployee: this.state.listEmployee.map((employee) =>
                        employee.id === this.state.employeeForUpdate.id
                            ? this.state.employeeForUpdate // Cach 2: responseData
                            : employee
                    ),
                    isOpenUpdate: false,
                });
            },
                (error) => {
                    this.setState({ error });
                }
            )
    };

    // DETAIL
    handleClickUpdate = (employee) => () => {
        // Cach 1:
        // this.setState({
        //     employeeForUpdate: employee,
        //     isOpenUpdate: true,
        // });

        // Cach 2
        const employeeId = employee.id;
        const apiUrl = `http://dummy.restapiexample.com/api/v1/employee/${employeeId}`;
        const options = {
            method: 'GET',
        }
        fetch(apiUrl, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        employeeForUpdate: employee, //Cach 2: result.data,
                        isOpenUpdate: true,
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    };

    render() {
        const { employeeForUpdate } = this.state;
        return (
            <div className="table-employee">
                <div className="ctn-add">
                    <p>Add New Employee</p>
                    <input
                        onChange={this.handleChange}
                        placeholder="Name"
                        name="employee_name"
                    />
                    <input
                        onChange={this.handleChange}
                        placeholder="Salary"
                        name="employee_salary"
                    />
                    <input
                        onChange={this.handleChange}
                        placeholder="Age"
                        name="employee_age"
                    />
                    <button onClick={this.handleAdd}>Add</button>
                </div>
                {this.state.isOpenUpdate === false ? null : (
                    <div className="ctn-update">
                        <p>Update Employee</p>
                        <input
                            onChange={this.handleChangeForUpdate}
                            placeholder="Name"
                            name="employee_name"
                            value={employeeForUpdate.employee_name}
                        />
                        <input
                            onChange={this.handleChangeForUpdate}
                            placeholder="Salary"
                            name="employee_salary"
                            value={employeeForUpdate.employee_salary}
                        />
                        <input
                            onChange={this.handleChangeForUpdate}
                            placeholder="Age"
                            name="employee_age"
                            value={employeeForUpdate.employee_age}
                        />
                        <button onClick={this.handleUpdate}>Update</button>
                    </div>
                )}
                <div className="employee-list">
                    <h3>Employee List</h3>
                </div>
                <table style={{ width: "100%" }}>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                        {
                            this.state.isLoaded == true
                            ?   (
                                    this.state.listEmployee.map((employee, idx) => (
                                        <tr key={idx}>
                                            <td>{employee.id}</td>
                                            <td>{employee.employee_name}</td>
                                            <td>{employee.employee_salary}</td>
                                            <td>{employee.employee_age}</td>
                                            <td>
                                                <button onClick={this.handleClickUpdate(employee)}>
                                                    Update
                                                </button>
                                                <button onClick={this.handleDeleteItem(employee.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )
                            :   (
                                    <tr> Loading.... </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Employee;