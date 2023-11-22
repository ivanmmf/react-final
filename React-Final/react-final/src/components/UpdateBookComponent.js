import React, {Component, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BookService from "../services/BookService";
import {useNavigate, useParams} from "react-router-dom";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { redirect } from "react-router-dom";

const UpdateBookComponent =  () => {


        // объявляем состояния приложения
        // this.state = {
        //     updatable : false,
        //     name: props.name,
        //     author: '',
        //     iban: '',
        //     book: {},
        //     id: ''


    const [book,setBook] = useState({})
    //const [id,setId] = useState('')
    const [author,setAuthor] = useState('')
    const [iban,setIban] = useState('')
    const [name,setName] = useState('')
    const {id} = useParams();

        // через методы присваиваем значения состоянию
        // this.initNameHandler = this.initNameHandler.bind(this);
        // this.initAuthorHandler = this.initAuthorHandler.bind(this);
        // this.initIbanHandler = this.initIbanHandler.bind(this);
        // this.updateBook = this.updateBook.bind(this);



    useEffect( () => {
            console.log(id)
            BookService.setId(id)

            BookService.getBookById(BookService.id).then((res) => {
                setBook(res.data)
                setName(res.data.name)
                setAuthor(res.data.author)
                setIban(res.data.iban)
                // this.setState({book: res.data});
                // this.setState({name: this.state.book.name})
                // this.setState({author: this.state.book.author})
                // this.setState({iban: this.state.book.iban})
            });
        },[]
    );

// создаём методы для присвоения значения состоянию
//     initNameHandler = (event) => {
//         this.setState({name: event.target.value});
//     }
//
//     initAuthorHandler = (event) => {
//         this.setState({author: event.target.value});
//     }
//
//     initIbanHandler = (event) => {
//         this.setState({iban: event.target.value});
//     }

    const updateBook = (e) => {
        e.preventDefault();
        let book = {name, author, iban}
        //console.log('employee => ' + JSON.stringify(employee));

        BookService.updateBookById(id,book).then(res => {
            window.location.replace('/')
        });
    }

    // метод для отмены создания работника и перехода на список работников
    const cancel = (e) => {
        e.preventDefault();
        window.location.replace('/');
    }

    // метод, отвечающий за отображение на странице браузера


    //const book = book
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center"> Редактировать книгу </h3>
                        <div className="card-body">

                            <form>
                                <div className="form-group">
                                    <label> Название </label>
                                    <input
                                        placeholder="Название"
                                        name="name"
                                        className="form-control"
                                        defaultValue={name}
                                        onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label> Автор </label>
                                    <input
                                        placeholder="Автор"
                                        name="author"
                                        className="form-control"
                                        defaultValue={author}
                                        onChange={(e) => setAuthor(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label> Iban </label>
                                    <input
                                        placeholder="Iban"
                                        name="iban"
                                        className="form-control"
                                        defaultValue={iban}
                                        onChange={(e) => setIban(e.target.value)}/>
                                </div>
                                <div style={{float: 'right', marginLeft: '5px', marginTop: '5px'}}>
                                    <button
                                        className="btn btn-success"
                                        onClick={updateBook}>Сохранить
                                    </button>
                                </div>
                                <div style={{float: 'right', marginLeft: '5px', marginTop: '5px'}}>
                                    <button
                                        className="btn btn-danger"
                                        onClick={cancel}>Отменить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default UpdateBookComponent;

