import './App.css';
import {BrowserRouter as Router, Route, Routes, Switch} from "react-router-dom";
import ListBookComponent from "./components/ListBookComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import AddBookComponent from "./components/AddBookComponent";
import SearchBookByIdComponent from "./components/GetBookByIdComponent";
import GetBookByIdComponent from "./components/GetBookByIdComponent";
import UpdateBookComponent from "./components/UpdateBookComponent";
import GetBookByAuthorComponent from "./components/GetBookByAuthorComponent";
import LoginComponent from "./components/LoginComponent";
import UserPageComponent from "./components/UserPageComponent";
import AddBookUserPageComponent from "./components/AddBookUserPageComponent";
import RequireAuth from "./components/RequireAuth";
import React, { useState} from 'react';
import ErrorBoundary from "./components/ErrorBoundary";


const App = () => {
    const [login,setLogin] = useState('')

    const updateLogin = (login) => {
        console.log(login + '!')
        setLogin(login);
        console.log(login + '!' +'app')
        console.log()
    }
    console.log(login + '!' +'app')
    return (
        <div>
            <ErrorBoundary>
            <Router>

                <HeaderComponent/>
                <div className="container">
                    <Routes>
                        <Route path="/login" element={<LoginComponent/>}/>
                        <Route element={<RequireAuth allowedRoles={['ROLE_user', 'ROLE_admin']} />}>
                        <Route path="/user" element={<UserPageComponent onLogin = {updateLogin}/>}/>
                        <Route path="/user-add-book" element={<AddBookUserPageComponent login = {login}/>}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={['ROLE_admin']} />}>
                          <Route path="/add-book" exact element={<AddBookComponent/>}/>
                          <Route path="/" exact element={<ListBookComponent/>}/>
                          <Route path="/update-book/:id" element={<UpdateBookComponent/>}/>
                          <Route path="/search-book-id/:id" element={<GetBookByIdComponent/>}/>
                          <Route path="/search-book-author/:author" element={<GetBookByAuthorComponent/>}/>
                      </Route>
                    </Routes>

                </div>
    <FooterComponent/>

            </Router>
        </ErrorBoundary>
        </div>
);
}

export default App;
