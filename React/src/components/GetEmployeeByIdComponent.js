import React, {Component} from 'react';
import EmployeeService from "../services/EmployeeService";

class GetEmployeeByIdComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            employee: {}
        }
    }

    // присваиваем значения состоянию компонента
    componentDidMount() {
        EmployeeService.getEmployeeById(EmployeeService.id).then((res) => {
            this.setState({employee: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee');
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
                            [this.state.employee].map(
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

export default GetEmployeeByIdComponent;