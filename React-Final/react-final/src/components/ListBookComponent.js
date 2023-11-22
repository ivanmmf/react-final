import React, {Component, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BookService from "../services/BookService";
import {useNavigate} from "react-router-dom";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { redirect } from "react-router-dom";

const ListBookComponent = () =>  {
    const [books,setBooks] = useState([])
    const [Masterchecked,setMasterchecked] = useState(false)
    const [SelectedList,setSelectedList] = useState([])
    const [id,setId] = useState('')
    const [author,setAuthor] = useState('')
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         books: [],
    //         MasterChecked: false,
    //         SelectedList: [],
    //         id: '',
    //         author: ''
    //
    //     }
    // };


    // const rowhandler = (selectedRow) => {
    //     this.state.id = ("selectedRow:", selectedRow)
    //     return this.updateBookById()
    // }

    const bookIndex = (book) => {
        setId(book.id);
        };


    // присваиваем значения состоянию компонента
    useEffect(()=> {
        BookService.getBooks().then((res) =>  setBooks(res.data)
        );

    },[])

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
    const getSelectedRows = ()=> {
        setSelectedList(books.filter((e) => e.selected))
        // this.setState({
        //     SelectedList: this.state.books.filter((e) => e.selected),
        // });
    }

     function addBook (){

        // return <Navigate to="/add-book" state={{ from: location }} replace   />;
         window.location.replace("/add-book")
    }

    function userBook (){

        window.location.replace("/user")
    }

    const deleteBooks = async () => {
        //this.SelectedList = this.state.SelectedList
        const deleteRowIds = SelectedList.map(item => item.id);
        console.log('ids => ' + JSON.stringify(deleteRowIds));
        await BookService.deleteBook(deleteRowIds);
        window.location.reload()
    }
    const searchBookById = (e) => {
        e.preventDefault();
        //this.id = this.state.id
        //console.log('id => ' + JSON.stringify(id));
        //BookService.setId(this.id);
        window.location.replace('/search-book-id/' + id)
    }

    const searchBookByAuthor = (e) => {
        e.preventDefault();
        //this.id = this.state.id
        //console.log('id => ' + JSON.stringify(id));
        //BookService.setId(this.id);
        window.location.replace('/search-book-author/' + author)
    }



    const updateBookById = () => {
       //setId(id);
        console.log('id => ' + JSON.stringify(id));
        BookService.setId(id);
        window.location.replace('/update-book/'+ id)
    }

        return (
            <div style={{marginBottom:'50px'}}>
                <div>
                    <div style={{float: 'right', marginTop:'30px', color: 'black'}}>
                        <button
                            className="btn btn-floating"
                            style={{ color: "blue" }}
                            onClick={userBook}
                        >
                            Мои книги
                        </button>
                    </div>

                    <Form>
                        <Form.Label>ID</Form.Label>
                        {/*<Form.Control type="ID" placeholder="Enter ID" />*/}
                        <div class="input-group mb-3 w-25">
                        <input
                            placeholder="Идентификатор"
                            name="id"
                            className="form-control"
                            value={id}
                            onChange={(e) => setId(e.target.value)}/>
                            <div style={{marginLeft:'5px'}}>
                            <button
                                className="btn btn-success"
                                onClick={searchBookById}>Найти
                            </button>
                            </div>
                        </div>
                    </Form>
                </div>
                <div>
                <Form>
                    <Form.Label>Author</Form.Label>
                    {/*<Form.Control type="ID" placeholder="Enter ID" />*/}
                    <div class="input-group mb-3 w-25">
                        <input
                            placeholder="Автор"
                            name="author"
                            className="form-control"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}/>
                        <div style={{marginLeft:'5px'}}>
                            <button
                                className="btn btn-success"
                                onClick={searchBookByAuthor}>Найти
                            </button>
                        </div>
                    </div>
                </Form>
                </div>
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
                            <th scope="col"> Название </th>
                            <th scope="col"> Автор </th>
                            <th scope="col"> Iban </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            books.map(
                                book =>
                                    <tr key = {book.id} className={book.selected ? "selected" : ""} onDoubleClick ={(e) => {BookService.setId(book.id);
                                        window.location.replace('/update-book/'+ book.id)} }>
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
               <div style={{float: 'right',marginLeft:'5px'}}>
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

export default ListBookComponent;

