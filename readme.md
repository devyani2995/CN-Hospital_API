# Hospital API

This is a Hospital API built with Node.js, Express, and MongoDB. The API allows doctors to register and login, patients to register, and create and view reports.

## Features

- Doctor registration and login
- Patient registration
- Create reports for patients
- View all reports of a patient
- Filter reports by status

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Passport.js for authentication

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/devyani2995/CN-Hospital_API.git
    ```

2. Navigate to the project directory:
    ```bash
    cd CN-Hospital_API
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
    Create a [.env](http://_vscodecontentref_/1) file in the root directory and add the following:
    ```env
    DB_URL=your_mongodb_uri
    PORT=port number
    ```

5. Start the server:
    ```bash
    node server.js
    ```

## API Endpoints

### Doctor Routes

- **POST /doctors/register**: Register a new doctor
- **POST /doctors/login**: Login a doctor

### Patient Routes

- **POST /patients/register**: Register a new patient (protected by JWT)
- **POST /patients/:id/create_report**: Create a report for a patient (protected by JWT)
- **GET /patients/:id/all_reports**: Get all the reports of a patient (protected by JWT)

### Report Routes

- **GET /reports/:status**: Get all reports filtered by status
