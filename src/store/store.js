import Vuex from "vuex";
import BooksService from "../service/BooksService";
import StorageService from "../service/StorageService";

export const GET_BOOKS = "/getBooks";
export const GET_USER_BOOKS = "/getUserBooks";
export const SET_USER_BOOKS = "/setUserBooks";
export const SET_BOOKS = "/setBooks";
export const UPDATE_BOOKS = "/updateBooks";
export const DELETE_BOOK = "/deleteBook";
export const GET_SELECTED_BOOK = "/getSelectedBooks";
export const SET_SELECTED_BOOK = "/setSelectedBooks";
export const LOAD_BOOKS = "/loadBooks";
export const LOAD_USER_BOOKS = "/loadUserBooks";
export const SEARCH_BOOKS = "/searchBooks";

export default new Vuex.Store({
  state: {
    books: null,
    selectedBook: null,
    userBooks: null
  },
  getters: {
    [GET_BOOKS](state) {
      return state.books;
    },
    [GET_SELECTED_BOOK](state) {
      return state.selectedBook;
    },
    [GET_USER_BOOKS](state) {
      return state.userBooks;
    }
  },
  mutations: {
    [SET_BOOKS](state, { books }) {
      state.books = books;
    },
    [SET_USER_BOOKS](state, { books }) {
      state.userBooks = books;
    },
    [SET_SELECTED_BOOK](state, { book }) {
      state.selectedBook = book;
    },
    [UPDATE_BOOKS](state, { newBook }) {
      if (state.userBooks === undefined)   state.userBooks = [] 
      let bookIdx = state.userBooks.findIndex(book => book._id === newBook._id);
      bookIdx >= 0
        ? state.userBooks.splice(bookIdx, 1, newBook)
        : state.userBooks.unshift(newBook);
      StorageService.saveToStorage("books", state.userBooks);
    },
    [DELETE_BOOK](state, { deletedBook }) {
      let idx = state.books.findIndex(book => book._id === deletedBook._id);
      if (idx >= 0) state.books.splice(idx, 1)
      let userIdx = state.userBooks.findIndex(book => book._id === deletedBook._id);
      if (userIdx >= 0) state.userBooks.splice(userIdx, 1);
      StorageService.saveToStorage("books", state.userBooks);
    }
  },
  actions: {
    [LOAD_BOOKS]({ commit }) {
      BooksService.getBooks()
        .then(books => {
          commit({ type: SET_BOOKS, books });
        })
        .catch(err => {
          commit(SET_BOOKS, []);
          throw err;
        });
    },
    [SEARCH_BOOKS]({ commit }, value) {
      BooksService.getBooks(value.value)
        .then(books => {
          commit({ type: SET_BOOKS, books });
        })
        .catch(err => {
          commit(SET_BOOKS, []);
          throw err;
        });
    },
    [LOAD_USER_BOOKS]({ commit }) {
      let books = StorageService.loadFromStorage('books');
      books ? commit({ type: SET_USER_BOOKS, books }) : commit(SET_USER_BOOKS, []);
    }
  },
  strict: true
});
