import React, {Component, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BookService from "../services/BookService";
import {useHistory, withRouter} from "react-router-dom";
import UserPageComponent from "./UserPageComponent";
import {useNavigate} from "react-router-dom";
const AddBookUserPageComponent = (props) => {

    const [books, setBooks] = useState([])
    const [Masterchecked, setMasterchecked] = useState(false)
    const [SelectedList, setSelectedList] = useState([])
    const [id, setId] = useState('')
    const [author, setAuthor] = useState('')
    const [login, setLogin] = useState(props.login)
    let navigate = useNavigate();


    // const rowhandler = (selectedRow) => {
    //     this.state.id = ("selectedRow:", selectedRow)
    //     return this.updateBookById()
    // }

    // присваиваем значения состоянию компонента


    useEffect(() => {
        //setLogin()
       // console.log(login)
        BookService.getBooksUser().then((res) => setBooks(res.data)
        );

    }, [])

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

    }


    function getSelectedRows()
    {
        this.setState({
            SelectedList: this.state.books.filter((e) => e.selected),
        });
    }

    function cancel()
    {
        window.location.replace('/user');
    }

    const addBooks = async () => {
        //this.SelectedList = this.state.SelectedList;
        const addRowIds = SelectedList.map(item => item.id);
        console.log('ids => ' + JSON.stringify(addRowIds));
        BookService.setLogin(login)
        await BookService.addUserBook(addRowIds,login);
        navigate('/user');
    }


        return (
            <div style={{marginBottom: '50px'}}>


                <h2 className="text-center"> Список книг </h2>
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
                                    <tr key={book.id} className={book.selected ? "selected" : ""}>
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
                        onClick={cancel}
                    >
                        Отмена
                    </button>

                </div>
                <div style={{float: 'right'}}>
                    <button
                        className="btn btn-primary"
                        onClick={addBooks}
                    >
                        Добавить
                    </button>
                </div>

            </div>


        );

}

export default AddBookUserPageComponent;

