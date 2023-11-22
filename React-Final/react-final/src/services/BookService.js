import axios from "axios";
import {showError} from "../components/ErrorBoundary";

// константа для endpoint
const BOOKS_API_URL = "http://localhost:8080/api/v1/books"

const BOOKS_API_URL_FOR_USER = "http://localhost:8080/api/v2/books"

const BOOK_BY_ID_API_URL = "http://localhost:8080/api/v1/book"

const USER_BOOK_ID_API_URL = "http://localhost:8080/api/v2/user-book"

const BOOKS_BY_AUTHOR_API_URL = "http://localhost:8080/api/v1/books/author"

const WHO_AM_I_API_URL = "http://localhost:8080/api/v3/auth/whoami"

const config = {
    headers: {
        Authorization: 'Basic ' + btoa(sessionStorage.getItem("user") + ':' + sessionStorage.getItem("pwd"))
    }
};

class BookService {
    id;
    selectedRows;
    login;
    author;

    setId(id) {
        this.id = id
    }

    setLogin(login) {
        this.login = login
    }

    setAuthor(author) {
        this.author = author
    }


    getBooks() {
        return axios.get(BOOKS_API_URL, config);
    }

    getBooksUser() {
        return axios.get(BOOKS_API_URL_FOR_USER, config);
    }

    // метод создания книги
    addBook(book) {
        return axios.post(BOOKS_API_URL, book, config).catch(e => showError(e));
    }

    getBookById(id) {
        this.id = id;
        return axios.get(BOOK_BY_ID_API_URL + '/' + id, config)
    }
    getBookByAuthor(author) {
        this.author = author;
        return axios.get(BOOKS_BY_AUTHOR_API_URL + '/' + author, config)
    }


    async deleteBook(selectedRows) {
        this.selectedRows = selectedRows;
        console.log('selectedRows => ' + JSON.stringify(selectedRows));
        for (const rowId of selectedRows) {
            console.log('rowId => ' + rowId);

            await axios.delete(BOOK_BY_ID_API_URL + '/' + rowId, config)
        }
    }

    getUserBook(login) {
        this.login = login;
        return axios.get(USER_BOOK_ID_API_URL + '/' + login, config)
    }

    async addUserBook(selectedRows,login) {
        this.selectedRows = selectedRows;
        console.log('selectedRows => ' + JSON.stringify(selectedRows));
        for (const rowId of selectedRows) {
            console.log('rowId => ' + rowId);
            let userBook = {login: login,book_id: rowId}
            await axios.post(USER_BOOK_ID_API_URL,userBook, config)
        }
    }

    async deleteUserBook(selectedRows,login) {
        this.selectedRows = selectedRows;
        console.log('selectedRows => ' + JSON.stringify(selectedRows));
        for (const rowId of selectedRows) {
            //let userBook = {login: login,book_id: rowId}
            const book_id = rowId
            await axios.delete(USER_BOOK_ID_API_URL, {
                headers: {
                    Authorization: config.headers.Authorization
                },
                data: {login,book_id}
            })
        }
    }
    updateBookById(id, book){
        this.id = id;
        return axios.put(BOOK_BY_ID_API_URL + '/' + id, book, config)
    }

    whoami() {
        return axios.get(WHO_AM_I_API_URL, config)
    };



}
export default new BookService()