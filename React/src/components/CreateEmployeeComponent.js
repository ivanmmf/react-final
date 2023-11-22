import React, {Component} from 'react';
import EmployeeService from "../services/EmployeeService";

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        // объявляем состояния приложения
        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        }

        // через методы присваиваем значения состоянию
        this.initFirstNameHandler = this.initFirstNameHandler.bind(this);
        this.initLastNameHandler = this.initLastNameHandler.bind(this);
        this.initEmailHandler = this.initEmailHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);

    }

// создаём методы для присвоения значения состоянию
    initFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    initLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }

    initEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }



    // метод для создания работника
    saveEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email}
        //console.log('employee => ' + JSON.stringify(employee));

        EmployeeService.createEmployee(employee).then(res => {
            this.props.history.push('/employees');
        });
    }

    // метод для отмены создания работника и перехода на список работников
    cancel() {
        this.props.history.push('/employees');
    }

    // метод, отвечающий за отображение на странице браузера
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center"> Добавить работника </h3>
                            <div className="card-body">
                                // форма в которую вводим данные работника
                                <form>
                                    <div className="form-group">
                                        <label> Имя </label>
                                        <input
                                            placeholder="Имя"
                                            name="firstName"
                                            className="form-control"
                                            value={this.state.firstName}
                                            onChange={this.initFirstNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Фамилия </label>
                                        <input
                                            placeholder="Фамилия"
                                            name="lastName"
                                            className="form-control"
                                            value={this.state.lastName}
                                            onChange={this.initLastNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Почта </label>
                                        <input
                                            placeholder="Почта"
                                            name="email"
                                            className="form-control"
                                            value={this.state.email}
                                            onChange={this.initEmailHandler}/>
                                    </div>

                                    // кнопки подтверждения и отмены
                                    <button
                                        className="btn btn-success"
                                        onClick={this.saveEmployee.bind(this)}>Сохранить
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={this.cancel.bind(this)}>Отменить
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateEmployeeComponent;