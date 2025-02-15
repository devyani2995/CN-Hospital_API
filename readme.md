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
    git clone https://github.com/yourusername/hospital-api.git
    ```

2. Navigate to the project directory:
    ```bash
    cd hospital-api
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

## Authentication

This API uses JWT for authentication. To access protected routes, include the JWT token in the `Authorization` header as follows:
```http
Authorization: Bearer <token>

<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'>##</vscode_annotation> Error Handling

The API returns appropriate HTTP status codes and error messages for different error scenarios, such as invalid credentials, resource not found, and internal server errors.

## License
This project is licensed under the MIT License.