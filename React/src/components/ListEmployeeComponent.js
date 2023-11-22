import React, {Component} from 'react';
import EmployeeService from "../services/EmployeeService";

class ListEmployeeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            employees: []
        }
    }

    // присваиваем значения состоянию компонента
    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({employees: res.data});
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center"> Список работников </h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Имя </th>
                            <th> Фамилия </th>
                            <th> Почта </th>
                            <th> Действие </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.employees.map(
                                employee =>
                                    <tr key = {employee.id}>
                                        <td> {employee.firstName} </td>
                                        <td> {employee.lastName} </td>
                                        <td> {employee.email} </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;

