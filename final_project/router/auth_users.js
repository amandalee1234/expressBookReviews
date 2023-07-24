const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const JWTSEC = 'VERYVERYSEC';
let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const { username, pwd } = req.body;
    console.log(username);
    if (username === 'user' && pwd === 'pwd') {
      req.session.user = {
        username: username,
        pwd: pwd,
        token: jwt.sign({ user: 'user' }, JWTSEC)
      }
      console.log( req.session.user.token);
      return res.status(200).json({ message: "Login success"});
    }
    return res.status(401).json({ message: "Invaild user and password" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
     const isbn = req.params.isbn;
     let book = books[isbn];
     console.log(book);
     const username = req.session.user.username;
     console.log(username);
     
     const reviews = req.query.reveiws
     console.log(req.query);
     console.log(reviews);
     book['reviews'] = reviews;
  return res.status(200).json({message: "Finish update"});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
     const isbn = req.params.isbn;
     let book = books[isbn];
     console.log(book);
     const username = req.session.user.username;
     console.log(username);
     
     const reviews = req.query.reveiws
     console.log(req.query);
     console.log(reviews);
     delete book.reviews[username];
     
  return res.status(200).json({message: "Delete Finish"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
