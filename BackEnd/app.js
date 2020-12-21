// define denpendence
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const cors = require('cors');
// content 
const app = express();
const bookRoutes = require('./app/routes/books');
const orderRoutes = require('./app/routes/orders')
const userRoutes = require('./app/routes/users');
const authorRoutes = require('./app/routes/authors');
const categoryRoutes = require('./app/routes/categories');
const staffRoutes = require('./app/routes/staffs');
const publisherRoutes = require('./app/routes/publishers');
const reviewRoutes = require('./app/routes/reviews');
const cartRoutes = require('./app/routes/carts');
const adminRoutes = require('./app/routes/admins');
const auth = require('./app/middleware/auth')


// Test Palpay
const exphdbs = require('express-handlebars');
var path = require('path');
// TEST THANH TOÁN PAYPAL
// const paypal = require('paypal-rest-sdk');
// paypal.configure({
//   'mode': 'sandbox', //sandbox or live
//   'client_id': process.env.CLIENT_ID_PAYPAL,
//   'client_secret': process.env.CLIENT_SECRET_PAYPAL
// });
app.set('views', path.join(__dirname, "views"));
app.engine('handlebars', exphdbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// app.get('/', function (req, res) {
//   res.render('index');
// });
// app.post('/pay', (req, res) => {
//   const create_payment_json = {
//     "intent": "sale",
//     "payer": {
//       "payment_method": "paypal"
//     },
//     "redirect_urls": {
//       "return_url": "http://localhost:8080/success",
//       "cancel_url": "http://localhost:8080/cancel"
//     },
//     "transactions": [{
//       "item_list": {
//         "items": [{
//           "name": "The God Father 2020",
//           "sku": "001",
//           "price": "10.00",
//           "currency": "USD",
//           "quantity": 1
//         },{
//           "name": "The Alchemist",
//           "sku": "002",
//           "price": "12.00",
//           "currency": "USD",
//           "quantity": 1
//         }]
//       },
//       "amount": {
//         "currency": "USD",
//         "total": "22.00"
//       },
//       "description": "Hat for the best team ever"
//     }]
//   };

//   paypal.payment.create(create_payment_json, function (error, payment) {
//     if (error) {
//       throw error;
//     } else {
//       for (let i = 0; i < payment.links.length; i++) {
//         if (payment.links[i].rel === 'approval_url') {
//           res.redirect(payment.links[i].href);
//         }
//       }
//     }
//   });

// });

// app.get('/success', (req, res) => {
//   const payerId = req.query.PayerID;
//   const paymentId = req.query.paymentId;

//   const execute_payment_json = {
//     "payer_id": payerId,
//     "transactions": [{
//       "amount": {
//         "currency": "USD",
//         "total": "22.00"
//       }
//     }]
//   };

//   paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//     if (error) {
//       console.log(error.response);
//       throw error;
//     } else {
//    //   console.log(JSON.stringify(payment));
//       res.render('success.handlebars');
//     }
//   });
// });

// app.get('/cancel', (req, res) => res.render('cancel.handlebars'));







// connect to mongoose Atlase
// change password ==> change nodemon.json
mongoose.connect(//'mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@sellingbook-vj42r.mongodb.net/test?retryWrites=true&w=majority',
  'mongodb://admin:' + process.env.MONGO_ATLAS_PW + '@sellingbook-shard-00-00-vj42r.mongodb.net:27017,sellingbook-shard-00-01-vj42r.mongodb.net:27017,sellingbook-shard-00-02-vj42r.mongodb.net:27017/test?ssl=true&replicaSet=SellingBook-shard-0&authSource=admin&retryWrites=true&w=majority',
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);


// Authentication 
//app.use(auth);
//app.use(express.static(path.join(__dirname, 'public')));

//Ép Mongoose sử dụng thư viện promise toàn cục
mongoose.Promise = global.Promise;

app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "Authorization");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET, OPTIONS, PATCH");
    return res.status(200).json({});
  }
  next();
});
// ROUTES Request
app.use('/books', bookRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use('/authors', authorRoutes);
app.use('/categories', categoryRoutes);
app.use('/staffs', staffRoutes);
app.use('/publishers', publisherRoutes);
app.use('/reviews', reviewRoutes);
app.use('/carts', cartRoutes);
app.use('/admins', adminRoutes);
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
// set up bodyparser
//app.use(bodyParser.urlencoded)

module.exports = app;