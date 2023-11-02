# Biometric Time Clock ⏱

The Biometric Time Clock is a Node.js-based RESTful API designed to manage employee attendance. It allows for the creation of employee records, tracking check-in and check-out times, and calculating the duration of work.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the application](#running)
3. [Project Structure](#project-structure)
4. [Models](#models)
   - [Employee Model](#employee-model)
   - [Attendance Model](#attendance-model)
5. [API Endpoints](#api-endpoints)
   - [Create Employee](#create-employee)
   - [Get Employees](#list-employees)
   - [Filter Employees by Date](#list-employees-by-date)
   - [Check-In](#check-in)
   - [Check-Out](#check-out)
6. [Calculating Duration](#calculating-duration)
7. [Testing](#testing)

## 1. Introduction<a name="introduction"></a>

The Biometric Time Clock project is a Node.js-based RESTful API designed to manage employee attendance. It allows for the creation of employee records, tracking check-in and check-out times, and calculating the duration of work.

## 2. Getting Started<a name="getting-started"></a>

### Prerequisites<a name="prerequisites"></a>

- Node.js (version 18)
- MongoDB
- Docker (https://docs.docker.com/desktop/install/windows-install/)

### Installation<a name="installation"></a>

#### 1. Local installation (without docker)

1. Clone the repository:

```bash
git clone https://github.com/your-username/biometric-time-clock.git
```

2. Navigate to the project directory:

```bash
cd biometric-time-clock
```

3. Install dependencies::

```bash
npm install
```

4. Configure the environment variables:

Create .env file in the root directory

```bash
PORT=8080
MONGODB_URI=mongodb://127.0.0.1:27017/biometric-time-clock
#choose your mongoDB URL
```

5. Running the Application<a name="running"></a>

Run mongoDB server at mongodb://127.0.0.1:27017/
or make sure you have mongoDB url running

```bash
npm start
```

#### 2. Using Docker compose

1. Configure the environment variables:

```bash
PORT=8080
MONGODB_URI=mongodb://mongo:27017/biometric-time-clock
```

you can start the application using Docker Compose. Navigate to the project's root directory and run:

```bash
docker-compose build
docker-compose up -d
```

Or

```bash
docker-compose up -d --build
```

- Run npm command:

```bash
docker-compose exec web npm ...
```

- Stopping the Application:

```bash
docker-compose down
```

## 3. Project Structure<a name="project-structure"></a>

```bash
biometric-time-clock/
|-- src/
| |-- controllers/
| |-- models/
| |-- routes/
| |-- services/
| |-- app.js
|-- test/
|-- .env
|-- .gitignore
|-- docker-compose.yaml
|-- Dockerfile
|-- package.json
|-- README.md
|-- ...
```

## 4. Models<a name="models"></a>

Employee Model<a name="employee-model"></a>
The Employee model represents basic employee information.

```bash
// models/employeeModel.js

const employeeSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  department: { type: String, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);
```

Attendance Model<a name="attendance-model"></a>
The Attendance model includes information about check-in, check-out, and the duration of work.

```bash
// models/attendanceModel.js

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  checkIn: { type: Date },
  checkOut: { type: Date },
  comment: { type: String },
  duration: { type: Number },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
```

## 6. API Reference<a name="api-endpoints"></a>

### Create Employee<a name="create-employee"></a>

- Endpoint: POST `/api/v1/employees/create`
- Request Body:

```bash
{
  "lastName": "Doe",
  "firstName": "John",
  "department": "IT"
}
```

- Response:

```bash
{
  "_id": "5f8a7a9e85f26b02b814647d",
  "lastName": "Doe",
  "firstName": "John",
  "dateCreated": "2023-11-01T08:19:19.903Z",
  "department": "IT"
}
```

### Get Employees<a name="list-employees"></a>

- Endpoint: GET `/api/v1/employees`

- Response:

```bash
[
  {
    "_id": "5f8a7a9e85f26b02b814647d",
    "lastName": "Doe",
    "firstName": "John",
    "dateCreated": "2023-11-01T08:19:19.903Z",
    "department": "IT"
  },
  // Other employees...
]
```

### Filter Employees by Date<a name="list-employees-by-date"></a>

- Endpoint: GET `/api/v1/employees?creationDate=2023-11-01`

- Response:

```bash
[
  {
    "_id": "5f8a7a9e85f26b02b814647d",
    "lastName": "Doe",
    "firstName": "John",
    "dateCreated": "2023-11-01T08:19:19.903Z",
    "department": "IT"
  },
  // Other employees created on 2023-11-01...
]
```

### Check-In<a name="check-in"></a>

- Endpoint: POST `/api/v1/employees/check-in`
- Request

```bash
{
  "employeeId": "5f8a7a9e85f26b02b814647d",
  "comment": "Arrived at work."
}
```

- Response:

```bash
{
  "_id": "6543c14e7ba0f01062dede98",
  "employee": "6542b3888ddb9c733a5cb5f4",
  "checkIn": "2023-11-02T15:33:34.261Z",
  "comment": "Arrived at work.",
  "__v": 0,
  "duration": 0
}
```

### Check-Out<a name="check-out"></a>

- Endpoint: POST `/api/v1/employees/check-out`
- Request

```bash
{
  "employeeId": "5f8a7a9e85f26b02b814647d",
  "comment": "Finished work."
}
```

- Response:

```bash
{
  "_id": "6543c14e7ba0f01062dede98",
  "employee": "6542b3888ddb9c733a5cb5f4",
  "checkIn": "2023-11-02T15:33:34.261Z",
  "comment": "Finished work.",
  "__v": 0,
  "checkOut": "2023-11-02T15:33:49.748Z",
  "duration": 0
}
```

- Database

```bash
{
  "_id": "654235cbe6d8ae84f9521808",
  "employee": "654234e6702805ec048d5550",
  "checkIn":  "2023-11-01T11:26:03.371Z",
  "comment": "Optional comment about the check-out",
  "checkOut":"2023-11-01T11:26:09.113Z",
  "duration": 160
}
```

## Calculating Duration<a name="calculating-duration"></a>

When an employee checks out, the duration between check-in and check-out is calculated in minutes and saved in the duration field of the Attendance model.

## Testing<a name="testing"></a>

To run tests, use the following command:

```bash
npm test
```

(Jest, Supertest).
