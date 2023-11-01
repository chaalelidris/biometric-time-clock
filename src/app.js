import express from 'express';
import connectDB from './services/connect.js';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

import employeeRouter from './routes/employee.routes.js';
import attendanceRouter from './routes/attendence.routes.js';


dotenv.config()
const app = express();
const PORT = process.env.PORT;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/employees', employeeRouter);
app.use('/api/v1/attendances', attendanceRouter);


const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    })
  } catch (error) {
    console.log(error);
  }
}

startServer();

export default app;
