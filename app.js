import express from 'express';
import connectDB from './services/connect.js';
import logger from 'morgan';
import cookieParser from 'cookie-parser';


import { employeeRoutes } from './routes/employeeRoutes.js';


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', employeeRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const startServer = async () => {
  try {
    connectDB("mongodb://127.0.0.1:27017/btcDB");
    app.listen(8080, () => {
      console.log("Server started on http://localhost:8080");
    })
  } catch (error) {
    console.log(error);
  }
}

startServer();

export default app;
