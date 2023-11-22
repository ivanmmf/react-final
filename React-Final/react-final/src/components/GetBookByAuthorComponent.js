import React, {useEffect, useState} from 'react';
import BookService from "../services/BookService";
import {useParams} from "react-router-dom";

const GetBookByAuthorComponent = () => {

    const [books, setBooks] = useState([])

    // получаем параметры
    const {author} = useParams();

    // присваиваем значения состоянию компонента
    useEffect(() => {
        console.log(author)
        BookService.setAuthor(author)
        BookService.getBookByAuthor(BookService.author).then((res) => setBooks(res.data))
    }, [author])

    const cancel = (e) => {
        e.preventDefault();
        window.location.replace("/")
    }

    return (
        <div style={{marginBottom: '50px'}}>
            <h2 className="text-center"> Найденная книга </h2>
            <div className="row">

                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th> Название</th>
                        <th> Автор</th>
                        <th> Iban</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        books.map(
                            book =>
                                <tr key={book.id}>
                                    <td> {book.name} </td>
                                    <td> {book.author} </td>
                                    <td> {book.iban} </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>

            </div>
            <div style={{float: 'right', marginLeft: '5px', marginTop: '5px', marginBottom: '5px'}}>
                <button
                    className="btn btn-primary"
                    onClick={cancel}>Сбросить
                </button>
            </div>
        </div>
    );
}

export default GetBookByAuthorComponent;