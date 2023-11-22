import React, {Component, useState} from 'react';
import BookService from "../services/BookService";
import ErrorBoundary from "./ErrorBoundary";

const AddBookComponent = () =>  {
        let [name, setName] = useState('')
        let [author,setAuthor] = useState('')
        let [iban,setIban] = useState('')
    // объявляем состояния приложения


        // // через методы присваиваем значения состоянию
        // this.initNameHandler = this.initNameHandler.bind(this);
        // this.initAuthorHandler = this.initAuthorHandler.bind(this);
        // this.initIbanHandler = this.initIbanHandler.bind(this);
        // this.saveBook = this.saveBook.bind(this);



    const saveBook = (e) => {
        e.preventDefault();
        let book = {name, author, iban}
        //console.log('employee => ' + JSON.stringify(employee));

        if(book.name!=null && book.author!=null) {
            BookService.addBook(book).then(res => {
                // window.location.replace("/")
            });
        }
    }

    // метод для отмены создания работника и перехода на список работников
    const cancel = (e) => {
        e.preventDefault();
        window.location.replace("/")
    }

    // метод, отвечающий за отображение на странице браузера
        return (

            <div style={{marginBottom:'10px', marginTop: '10px'}}>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center"> Добавить книгу </h3>
                            <div className="card-body">

                                <form>
                                    <div className="form-group">
                                        <label> Название </label>
                                        <input
                                            placeholder="Название"
                                            name="name"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Автор </label>
                                        <input
                                            placeholder="Автор"
                                            name="author"
                                            className="form-control"
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Iban </label>
                                        <input
                                            placeholder="Iban"
                                            name="iban"
                                            className="form-control"
                                            value={iban}
                                            onChange={(e) => setIban(e.target.value)}/>
                                    </div>

                                    <div style={{float: 'right',marginLeft:'5px',marginTop: '5px'}}>

                                    <button
                                        className="btn btn-success"
                                        onClick={saveBook}>Сохранить
                                    </button>
                                    </div>

                                    <div style={{float: 'right',marginLeft:'5px',marginTop: '5px'}}>
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

export default AddBookComponent;

