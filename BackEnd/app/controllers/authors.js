const Author = require('./../models/author');
const Book = require('./../models/book');
const mongoose = require('mongoose');
const book = require('./../models/book');

module.exports = {

  getListAuthor: (req, res, next) => {
    Author.find({})
      .exec()
      .then(docs => {
        if (docs.length >= 0) {
          res.status(200).json(docs);
        } else {
          res.status(404).json({
            message: "No Entries Found"
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },

  createAuthor: async (req, res, next) => {
    const checkAuthor = await Author.findOne({ name: req.body.name });
    if (checkAuthor) {
      console.log(" Tên tác giả đã tồn tại !");
      return res.status(400).json({ message: " Tên tác giả đã tồn tại !" });
    }
    const author = new Author();
    author.name = req.body.name;
    author.firstname = req.body.firstname;
    author.lastname = req.body.lastname;
    Author.create(author, (err, author) => {
      if (err) {
        console.log("Error creating Author: ", err);
        res
          .status(400)
          .json(err)
      } else {
        console.log("Author Created: ", author);
        res
          .status(201)
          .json(author)
      }
    });

  },

  getAuthorID: async (req, res, next) => {
    const id = req.params.authorId;
    await Author.findById(id)
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          return res.status(200).json(doc);
        } else {
          res.status(404).json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });

  },

  updateAuthor: (req, res, next) => {
    //   const authorid = req.params.authorId;
    // const author = new Author();
    // author.name = req.body.name;
    // author.firstname = req.body.firstname;
    // author.lastname = req.body.lastname;
    Author.findByIdAndUpdate(req.params.authorId, { $set: req.body }, { new: true }, (err, author) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: err
        });
      } else {
        return res.status(200).json({
          message: 'Author updated',
          author: author
        });
      }
    });
  },


  deleteAuthor: async (req, res, next) => {
    const id = req.params.authorId;
    Author.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Author deleted',
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },

  searchAuthorByName: async (req, res, next) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
      searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
      const authors = await Author.find(searchOptions).populate([{
        path: 'books', select: 'title', model: book
      }]);
      if (authors != null && authors != '') {
        return res.status(200).json(authors);
      }
      return res.status(404).json({ message: "Không tìm thấy!!!" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }


}