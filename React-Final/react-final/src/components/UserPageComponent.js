import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BookService from "../services/BookService";
import {useNavigate, withRouter} from "react-router-dom";
import React, {Component, useEffect, useState} from 'react';
import async from "async";
import data from "bootstrap/js/src/dom/data";
import AddBookUserPageComponent from "./AddBookUserPageComponent";

const UserPageComponent = (props) => {
    const [books,setBooks] = useState([])
    const [Masterchecked, setMasterchecked] = useState(false)
    const [SelectedList,setSelectedList] = useState([])
    const [id,setId] = useState('')
    const [author,setAuthor] = useState('')
    const [login,setLogin] = useState('')
    let navigate = useNavigate()



    // initIdHandler = (event) => {
    //     this.setState({id: event.target.value});
    // }


    // rowhandler = (selectedRow) => {
    //     this.state.id = ("selectedRow:", selectedRow)
    //     return this.updateBookById()
    // }

    // присваиваем значения состоянию компонента
   useEffect(  () => {
       async function fetchData()  {
           // get the data from the api
           await BookService.whoami().then((res) => {
               BookService.setLogin(res.data);
               setLogin(res.data)

           });

           BookService.getUserBook(BookService.login).then((res) => setBooks(res.data));
       }

       fetchData()
           .catch(console.error);

   },[] )

    const onMasterCheck = (e) => {
        let tempList = books;
        // Check/ UnCheck All Items
        tempList.map((book) => (book.selected = e.target.checked));
        setMasterchecked(e.target.checked);
        setBooks(tempList);
        setSelectedList(books.filter((e) => e.selected))

    }



    const onItemCheck = (e, item) => {
        let tempList = books;
        tempList.map((book) => {
            if (book.id === item.id) {
                book.selected = e.target.checked;
            }
            return book;
        });
        const totalItems = books.length;
        const totalCheckedItems = tempList.filter((e) => e.selected).length;
        setMasterchecked(totalItems === totalCheckedItems);
        setBooks(tempList);
        setSelectedList(books.filter((e) => e.selected))
        // this.setState({
        //     MasterChecked: totalItems === totalCheckedItems,
        //     books: tempList,
        //     SelectedList: this.state.books.filter((e) => e.selected),
        // });
    }



    const addBook = (e) =>
    {
        e.preventDefault()
        props.onLogin(login)
       //window.location.replace('/user-add-book');
        navigate('/user-add-book')
    }

    const deleteBooks = async () => {
       // this.SelectedList = this.state.SelectedList;
        const deleteRowIds = SelectedList.map(item => item.id);
        console.log('ids => ' + JSON.stringify(deleteRowIds));
        await BookService.deleteUserBook(deleteRowIds, login);
       // window.location.reload()
        window.location.reload()
    }


        return (
            <div style={{marginBottom: '50px'}}>

                <h2 className="text-center"> Мои книги </h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={Masterchecked}
                                    id="mastercheck"
                                    onChange={(e) => onMasterCheck(e)}
                                />
                            </th>
                            <th scope="col"> Название</th>
                            <th scope="col"> Автор</th>
                            <th scope="col"> Iban</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            books.map(
                                book =>
                                    <tr key={book.id} className={book.selected ? "selected" : ""}
                                        onDoubleClick={() => this.rowhandler(book.id)}>
                                        <th scope="row">
                                            <input
                                                type="checkbox"
                                                checked={book.selected}
                                                className="form-check-input"
                                                id="rowcheck{book.id}"
                                                onChange={(e) => onItemCheck(e, book)}
                                            />
                                        </th>
                                        <td> {book.name}  </td>
                                        <td> {book.author} </td>
                                        <td> {book.iban} </td>

                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                    {/*<div className="row">*/}
                    {/*    <b>All Row Items:</b>*/}
                    {/*    <code>{JSON.stringify(this.state.List)}</code>*/}
                    {/*</div>*/}
                    {/*<div className="row">*/}
                    {/*    <b>Selected Row Items(Click Button To Get):</b>*/}
                    {/*    <code>{JSON.stringify(this.state.SelectedList)}</code>*/}
                    {/*</div>*/}


                </div>
                <div style={{float: 'right', marginLeft: '5px'}}>
                    <button
                        className="btn btn-primary"
                        onClick={deleteBooks}
                    >
                        Удалить
                    </button>

                </div>
                <div style={{float: 'right'}}>
                    <button
                        className="btn btn-primary"
                        onClick={addBook}
                    >
                        Добавить
                    </button>
                </div>

            </div>


        );

}

export default UserPageComponent;

