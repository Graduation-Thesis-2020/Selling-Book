const Book = require('../models/book');
const Author = require('./../models/author');
const Category = require('./../models/category');
const Publisher = require('./../models/publisher');
const User = require('./../models/user');
const Comment = require('./../models/review');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const category = require('./../models/category');
const review = require('./../models/review');
const author = require('./../models/author');
const publisher = require('./../models/publisher');
const { findOne, updateOne } = require('../models/book');

// configuration CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
module.exports = {



  createBook: async (req, res, next) => {
    cloudinary.v2.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        //req.flash('error', err.message);
        return res.redirect('back');
      }
      const book = new Book();
      // add url for image object book 
      book.imageUrl = result.secure_url;
      // add public id for image object book
      book.imageId = result.public_id;
      // add title for book
      book.title = req.body.title;
      book.description = req.body.description;


      book.publishDate = req.body.publishDate;


      book.pageCount = req.body.pageCount;
      book.price = req.body.price;
      book.availableQuantity = req.body.availableQuantity;

      book.author = req.body.author;

      //    Category.findById(req.body.categories, async (err,cate) =>{
      //        if(err)
      //        {
      //            return res.status(500).json({
      //                error: err
      //            })
      //        }
      //        book.categories.push(cate._id);
      //    });
      //   book.categories.push(req.body.categories);
      book.categories = req.body.categories;
      book.publisher = req.body.publisher;
      book.discount = req.body.discount;




      book.save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: 'Created book successfully',
            book
          });
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({
            error: err
          });
        });

      // add book in books of Author
      Author.findById(req.body.author, (err, author) => {
        if (err) {
          return res.status(204).json({
            error: err
          });
        }
        author.books.push(book);
        author.save();
      });

      // add book in books of Category
      // Category.findById(req.body.categories, (err, cate) => {
      //   if (err) {
      //     return res.status(204).json({
      //       error: err
      //     });
      //   }
      //   cate.books.push(book);
      //   cate.save();
      // });

      const catedata = req.body.categories;
      const catelength = catedata.length;
      //    return res.status(200).json(catedata[0]);
      let i;
      for (i = 0; i < catelength; i++) {
        Category.findById(catedata[i], (err, cate) => {
          if (err) {
            return res.status(204).json({
              error: err
            });
          }
          cate.books.push(book);
          cate.save();
        });
      }
      // add book in books of Publisher
      Publisher.findById(req.body.publisher, (err, publisher) => {
        if (err) {
          return res.status(204).json({
            error: err
          });
        }
        publisher.books.push(book);
        publisher.save();
      });
      // res.status(201).json(book);
      // Book.create(book, (err, book) => {
      //     if (err) {
      //         console.log("Error creating Book: ", err);
      //         res
      //             .status(400)
      //             .json(err)
      //     } else {
      //         console.log("Book Created: ", book);
      //         res
      //             .status(201)
      //             .json(book)
      //     }
      // });
    });

  },

  // Get List Book
  getListBook: async (req, res, next) => {
    // let query = Book.find()
    // if (req.query.title != null && req.query.title != '') {
    //     query = query.regex('title', new RegExp(req.query.title, 'i'))
    // }
    // try {
    //     const books = await query.exec()
    //     res.status(200).json(books)
    // } catch {
    //     res.redirect('/')
    // }
    //categories reviews author publisher
    let book = await Book.find().populate([{
      path: 'categories', select: 'name', model: category
    }, {
      path: 'reviews', select: 'review date comment ', model: review
    }, {
      path: 'author', select: 'name firstname lastname', model: author
    }, {
      path: 'publisher', select: 'name', model: publisher
    }]);
    if (!book) {
      return res.status(401).json({
        message: " Kho Sách rỗng!!!"
      });
    }
    return res.status(200).json(book);
  },

  // get book by bookID
  getBookID: async (req, res, next) => {
    const id = req.params.bookId;
    // await Book.findById(id)
    //     // .select('title price _id bookImage')
    //     .exec()
    //     .then(doc => {
    //         console.log("From database", doc);
    //         if (doc) {
    //             return res.status(200).json(doc);
    //         } else {
    //             res.status(404).json({ message: "No valid entry found for provided ID" });
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({ error: err });
    //     });
    try {
      let book = await Book.findOne({ _id: id }).populate([{
        path: 'categories', select: 'name', model: category
      }, {
        path: 'reviews', select: 'review date comment ', model: review
      }, {
        path: 'author', select: 'name firstname lastname', model: author
      }, {
        path: 'publisher', select: 'name', model: publisher
      }]);
      if (!book) {
        return res.status(404).json({
          message: " Không tìm thấy sách!!!"
        });
      }
      return res.status(200).json(book);
    } catch {
      return res.status(404).json({
        message: "No valid entry found for provided ID"
      })
    }
  },

  // Get Comment by ID book
  getCommentBybookId: async (req, res, next) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId).populate('reviews');
    console.log('book', book);
    res.status(200).json(book.reviews);
  },

  // Get Author by ID book
  getAuthorBybookId: async (req, res, next) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId).populate('author');
    console.log('book', book);
    res.status(200).json(book.author);
  },

  // Get Category by ID book
  getCategoryBybookId: async (req, res, next) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId).populate('categories');
    console.log('book', book);
    res.status(200).json(book.categories);
  },

  // Get Category by ID book
  getCategoryBybookId: async (req, res, next) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId).populate('categories');
    console.log('book', book);
    res.status(200).json(book.categories);
  },


  // Get book by ID Category
  getBookByCategoryId: async (req, res, next) => {
    const cateId = req.params.cateId;
    const cate = await Category.findById(cateId).populate('books');
    res.status(200).json(cate.books);
  },

  // Get book by ID Author
  getBookByAuthorId: async (req, res, next) => {
    const authorId = req.params.authorId;
    const author = await Author.findById(authorId).populate('books');
    res.status(200).json(author.books);
  },

  // Get book by ID Publisher
  getBookByPublisherId: async (req, res, next) => {
    const publisherId = req.params.publisherId;
    const publisher = await Publisher.findById(publisherId).populate('books');
    res.status(200).json(publisher.books);
  },

  // Delete comment in reviews
  deleteReview: async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const bookId = req.path.bookId;
    const book = await Book.findById(bookId);
    await book.reviews.id(reviewId).remove();
    await book.save();
    // xóa review trong model review
    const review = await Comment.findOne({ _id: reviewId });
    await review.remove();

    res.status(200).json({
      message: 'Ok được rồi!!!'
    });
  },
  // delete Book
  deleteBook: async (req, res, next) => {
    Book.findById(req.params.bookId, async (err, book) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      try {
        await cloudinary.v2.uploader.destroy(book.imageId);
        const cateIdArray = book.categories;
        const catelength = cateIdArray.length;
        let i;
        let catedata;
        for (i = 0; i < catelength; i++) {
          catedata = await Category.findOne(cateIdArray[i]);
          catedata.books.remove(book._id);
          await catedata.save();
        }
        //return res.status(200).json(catedata);

        // Xóa ID sách đó trong Model Publisher
        let pubdata = await Publisher.findOne({ _id: book.publisher });
        await pubdata.books.remove(book._id);
        await pubdata.save();

        // Xóa ID book đó trong Model Author
        let authdata = await Author.findOne({ _id: book.author });
        await authdata.books.remove(book._id);
        await authdata.save();

        // Xóa tất cả Comment của Book đó
        let comArray = book.reviews;
        let comLength = comArray.length;
        let comdata;
        for (i = 0; i < comLength; i++) {
          comdata = await Comment.findOne(comArray[i]);
          await comdata.remove();
        }

        book.remove();

        return res.status(201).json({
          message: 'Book deleted successfully!!!'
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          error: err
        });
      }
    });

  },

  // update a book on PATCH
  updateBook: async (req, res, next) => {
    const id = req.params.bookId;
    Book.findById(id, async (err, book) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        if (req.file) {
          try {
            await cloudinary.v2.uploader.destroy(book.imageId);
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            book.imageId = result.public_id;
            book.imageUrl = result.secure_url;
          } catch (err) {
            return res.status(500).json({
              error: err
            });
          }
          book.title = req.body.title;
          book.description = req.body.description;
          book.publishDate = req.body.publishDate;
          book.pageCount = req.body.pageCount;
          book.price = req.body.price;
          book.availableQuantity = req.body.availableQuantity;

          book.author = req.body.author;
          //  book.categories.push(req.body.categories);
          const cateOld = book.categories;  // lấy cate cũ trong book
          book.categories = req.body.categories;

          // Xóa all cate cũ trong Model Categories để update những cái cate mới vào Model
          let catelength = cateOld.length;
          let i;
          let catedata;
          for (i = 0; i < catelength; i++) {
            catedata = await Category.findOne({ _id: cateOld[i] });
            catedata.books.remove(book._id);
            await catedata.save();
          }
          // Push từng cate mới vào Model Categories
          cateIdArray = req.body.categories;
          catelength = cateIdArray.length;
          for (i = 0; i < catelength; i++) {
            catedata = await Category.findOne({ _id: cateIdArray[i] });
            catedata.books.push(book._id);
            await catedata.save();
          }

          book.publisher = req.body.publisher;
          book.discount = req.body.discount;
          book.save();
          //  res.redirect('/books/' + book._id);
          return res.status(200).json(book);
        } else {    // Update Book khi không có Ảnh
          book.title = req.body.title;
          book.description = req.body.description;
          book.publishDate = req.body.publishDate;
          book.pageCount = req.body.pageCount;
          book.price = req.body.price;
          book.availableQuantity = req.body.availableQuantity;

          book.author = req.body.author;
          //  book.categories.push(req.body.categories);
          const cateOld = book.categories;
          book.categories = req.body.categories;

          // Xóa all cate cũ trong Model Categories để update những cái cate mới vào Model
          let catelength = cateOld.length;
          let i;
          let catedata;
          for (i = 0; i < catelength; i++) {
            catedata = await Category.findOne({ _id: cateOld[i] });
            catedata.books.remove(book._id);
            await catedata.save();
          }
          // Push từng cate mới vào Model Categories
          cateIdArray = req.body.categories;
          catelength = cateIdArray.length;
          let j;
          //    console.log(catelength);
          //     return res.status(400).json(catelength);
          for (j = 0; j < catelength; j++) {
            catedata = await Category.findOne({ _id: cateIdArray[j] });
            catedata.books.push(book._id);
            await catedata.save();
          }

          book.publisher = req.body.publisher;
          book.discount = req.body.discount;
          book.save();
          //  res.redirect('/books/' + book._id);
          return res.status(200).json(book);
        }

      }
    });
  },



  // Search Book By title
  searchBookByTitle: async (req, res, next) => {
    let searchOptions = {}
    if (req.query.title != null && req.query.title !== '') {
      searchOptions.title = new RegExp(req.query.title, 'i')
    }
    try {
      const books = await Book.find(searchOptions).populate([{
        path: 'categories', select: 'name', model: category
      }, {
        path: 'reviews', select: 'review date comment ', model: review
      }, {
        path: 'author', select: 'name firstname lastname', model: author
      }, {
        path: 'publisher', select: 'name', model: publisher
      }]);
      res.status(200).json(books);
      // res.render('authors/index', {
      //     authors: authors,
      //     searchOptions: req.query
      // })
    } catch {
      res.redirect('/')
    }
  },

  // Get Book Have DISCOUNT 
  bookHaveDiscount: async (req, res, next) => {
    let bookdata = await Book.find();
    let bookLength = bookdata.length;
 
    let i;
    let bookDiscount= [] ;
    // if(bookdata[0].discount == '0' )  return res.status(200).json(bookdata[0]);
    // return res.status(200).json({message:" ko dc"});

    for( i=0 ; i< bookLength ; i++ )
    {
      if(parseInt(bookdata[i].discount) != 0 )
      {
        bookDiscount.push(bookdata[i]);
      }
    }
    if(bookDiscount.length == 0) {
      return res.status(200).json({
        message: 'Không có sách nào giảm giá!!!'
      })
    }
    return res.status(200).json(bookDiscount);
   // return res.status(200).json(bookLength);
  },


}

