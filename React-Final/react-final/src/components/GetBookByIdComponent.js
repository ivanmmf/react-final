import BookService from "../services/BookService";
import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

const GetBookByIdComponent = () => {

    const [book, setBook] = useState([])

    // получаем параметры
    const {id} = useParams();

    // присваиваем значения состоянию компонента
    useEffect(() => {
        console.log(id)
        BookService.setId(id)
        BookService.getBookById(BookService.id).then((res) => setBook(res.data))
    },[])

    const cancel = (e) => {
        e.preventDefault();
        window.location.replace("/")
    }
    let books = Array.of(book);

    return (
        <div style={{marginBottom: '50px'}}>
            <h2 className="text-center"> Найденная книга </h2>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th> Название </th>
                        <th> Автор </th>
                        <th> Iban </th>
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
            <div style={{float: 'right',marginLeft:'5px',marginTop: '5px',marginBottom: '5px'}}>
                <button
                    className="btn btn-primary"
                    onClick={cancel}>Сбросить
                </button>
            </div>
        </div>
    );
}

export default GetBookByIdComponent;