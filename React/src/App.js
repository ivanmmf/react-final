import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import GetEmployeeByIdComponent from "./components/GetEmployeeByIdComponent";
import SearchEmployeeComponent from "./components/SearchEmployeeComponent";

function App() {
  return (
      <div>
          <Router>
              <HeaderComponent/>
              <div className="container">
                  <Switch>
                      // описываем куда какой компонент загружать
                      <Route path="/" exact component={ListEmployeeComponent}/>
                      <Route path="/employees" component={ListEmployeeComponent}/>
                      <Route path="/add-employee" component={CreateEmployeeComponent}/>
                      <Route path="/employee" component={GetEmployeeByIdComponent}/>
                      <Route path="/search-employee" component={SearchEmployeeComponent}/>
                  </Switch>
              </div>
              <FooterComponent/>
          </Router>
      </div>
  );
}

export default App;
