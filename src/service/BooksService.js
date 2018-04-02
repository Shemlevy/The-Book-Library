"use strict";

import axios from "axios";

function getBooks(query) {
  if (!query) query = "Shit luck";
  return axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then(res => {
      return editBooks(res.data.items);
    })
    .catch(_ => {
      console.error("error", _);
    });
}

function editBooks(books) {
  return books.map(book => {
    return {
      _id: book.id,
      description: book.volumeInfo.description,
      authors: getCleanStr(book.volumeInfo.authors),
      title: book.volumeInfo.title,
      date: new Date(book.volumeInfo.publishedDate),
      img: setImage(book.volumeInfo.imageLinks)
    };
  });
}

function getEmptyBook(){
  return {
    _id: Date.now(),
    description:'',
    authors: '',
    title: '',
    date: new Date(),
    img: setImage(book.volumeInfo.imageLinks)
  }
}

function getCleanStr(str) {
  if (!str) return ''
  let editStr = str[0].replace(/[^0-9a-zA-Z]w+/g, "");
  return editStr;
}

function setImage(x) {
  if (x) {
    return x.thumbnail;
  } else {
    
    return "https://github.com/Shemlevy/the-book-library/blob/master/static/bookcover.jpg";
    
  }
}

export default {
  getBooks
};
