import React, {Component} from 'react';
import EmployeeService from "../services/EmployeeService";

class SearchEmployeeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: ''
        }
    }

    initIdHandler = (event) => {
        this.setState({id: event.target.value});
    }

    searchEmployeeById = (e) => {
        e.preventDefault();
        this.id = this.state.id
        //console.log('id => ' + JSON.stringify(id));
        EmployeeService.setId(this.id);
        this.props.history.push('/employee');

    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center"> Поиск работника </h3>
                            <div className="card-body">
                                // форма в которую вводим данные работника
                                <form>
                                    <div className="form-group">
                                        <label> Id </label>
                                        <input
                                            placeholder="Идентификатор"
                                            name="id"
                                            className="form-control"
                                            value={this.state.id}
                                            onChange={this.initIdHandler}/>
                                    </div>

                                    <button
                                        className="btn btn-success"
                                        onClick={this.searchEmployeeById.bind(this)}>Найти
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
export default SearchEmployeeComponent;