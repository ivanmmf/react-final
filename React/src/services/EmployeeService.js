import axios from "axios";

// константа для endpoint
const EMPLOYEE_API_URL = "http://localhost:8080/api/v1/employees"

const EMPLOYEE_BY_ID_API_URL = "http://localhost:8080/api/v1/employee"

class EmployeeService {
    id;

    setId(id){
        this.id = id
    }

    // метод запроса списка сотрудников
    getEmployees() {
        return axios.get(EMPLOYEE_API_URL);
    }

    // метод создания списка сотрудников
    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_URL, employee);
    }

    getEmployeeById(id) {
        this.id = id;
        return axios.get(EMPLOYEE_BY_ID_API_URL, {
            params: {
                id: id
                }
            })
    }
}

export default new EmployeeService()