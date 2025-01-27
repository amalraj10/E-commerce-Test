var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const connectDB = require('./dbconnection/dbconnection');
const cors = require('cors');


// var indexRouter = require('./routes/product');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category');
var subCategoryRouter = require('./routes/subcategory');


var server = express();

// Add CORS middleware before other middleware
server.use(cors());

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
server.use(express.static(path.join(__dirname, 'public')));

connectDB();
// server.use('/', indexRouter);
server.use('/users', usersRouter);
server.use('/product', productRouter);
server.use('/category', categoryRouter);
server.use('/sub-category', subCategoryRouter);



// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.server.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Add port configuration
const port = process.env.PORT || 5000;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
