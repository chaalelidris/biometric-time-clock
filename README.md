# Biometric Time Clock

The Biometric Time Clock is a Node.js-based RESTful API designed to manage employee attendance. It allows for the creation of employee records, tracking check-in and check-out times, and calculating the duration of work.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Configuration](#configuration)
5. [Models](#models)
   - [Employee Model](#employee-model)
   - [Attendance Model](#attendance-model)
6. [API Endpoints](#api-endpoints)
   - [Create Employee](#create-employee)
   - [List Employees](#list-employees)
   - [List Employees by Date](#list-employees-by-date)
   - [Check-In](#check-in)
   - [Check-Out](#check-out)
7. [Authorization](#authorization)
8. [Calculating Duration](#calculating-duration)
9. [Testing](#testing)
10. [Deployment](#deployment)
11. [Contributing](#contributing)
12. [License](#license)

## 1. Introduction<a name="introduction"></a>

The Biometric Time Clock project is a Node.js-based RESTful API designed to manage employee attendance. It allows for the creation of employee records, tracking check-in and check-out times, and calculating the duration of work.

## 2. Getting Started<a name="getting-started"></a>

### Prerequisites<a name="prerequisites"></a>

- Node.js (version X.X.X)
- MongoDB

### Installation<a name="installation"></a>

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

```bash
PORT=8080
MONGODB_URI=mongodb://localhost:27017/biometric-time-clock
```

1.  Running the Application:

```bash
npm start
```

The server will run on http://localhost:8080.
