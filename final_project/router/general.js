const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const public_users = express.Router();
const JWTSEC = 'VERYVERYSEC';


public_users.post("/register", (req, res) => {
  const { username, pwd } = req.body;
  console.log(req['username']);
  if (username === 'user' && pwd === 'pwd') {
    return res.status(200).json({ token: jsontoken.sign({ user: 'user' }, JWTSEC) });
  }
  return res.status(401).json({ message: "Invaild user and password" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  let jsonData = books[req.params.isbn];
  return res.status(200).json(jsonData);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  let jsonData = [];
  for (var book in books) {
    if (books[book]['author'].includes(req.params.author)) {
      jsonData.push(books[book]);
    }
  }

  return res.status(200).json({ "booksbyauthor": jsonData });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  console.log('title');
  let jsonData = [];
  for (var book in books) {
    if (books[book]['title'].includes(req.params.title)) {
      jsonData.push(books[book]);
    }
  }
  return res.status(200).json({ "booksbytitle": jsonData });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  let jsonData = books[req.params.isbn];
  let reviews = jsonData['reviews']
  return res.status(200).json({ reviews });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  let jsonData = books[req.params.isbn];
  let reviews = jsonData['reviews']
  return res.status(200).json({ reviews });
});

function booksList() {
    return new Promise((resolve, reject) => {
        resolve(books);
    });
}

function getBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
        let isbn = parseInt(isbn);
        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject({status:404, message:`Book ${isbn} not found`});
        }
    })
}

function getBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
        const intIsbn = parseInt(isbn);
        if (books[intIsbn]) {
            resolve(books[intIsbn]);
        } else {
            reject({status:404, message:`Book ${intIsbn} not found`});
        }
    })
}
function getBookByAuthor(author) {
    return new Promise((resolve, reject) => {
        const uthor = author;
        for (var book in books) {
            if (books[book]['author'].includes(req.params.author)) {
              jsonData.push(books[book]);
            }
          }
        if (jsonData.length()>0) {
            resolve(jsonData);
        } else {
    reject({status:404, message:`Book author ${author} not found`});
        }
    })
}

module.exports.general = public_users;
