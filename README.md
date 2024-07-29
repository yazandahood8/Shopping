# Shopping

## Overview

This project is a web application built with a React frontend and a Java Spring Boot backend. The application includes features such as login, sign up, home, and product listing with filters for price, new/old status, and search by name.

## Features

### Frontend (React)
- **Login**: User authentication with username and password.
- **Sign Up**: User registration with email, username, and password.
- **Home**: Welcome page for the application.
- **Products**: Product listing with filters:
  - Filter by price.
  - Filter by new/old status.
  - Search by product name.

### Backend (Java Spring Boot)
- **API Endpoints**:
  - POST /users/login: User login.
  - POST /users/signup: User registration.
  - GET /products: Get list of products.
  - POST /products: Add a new product.

## Setup Instructions

### Prerequisites
- Node.js and npm
- Java Development Kit (JDK)
- Maven
- Git

### Frontend Setup

1. Clone the repository:
   
2. bash
   git clone https://github.com/yazandahood8/Shopping.git
3. Navigate to the frontend directory:

4. bash
Copy code
5. cd Shopping/frontend
Install the dependencies:

6. bash
Copy code
7. npm install
Start the React application:

8. bash
Copy code
npm start
### Backend Setup
Navigate to the backend directory:

1. bash
Copy code
cd Shopping/backend
2. Build the project with Maven:

3. bash
Copy code
mvn clean install
Run the Spring Boot application:

5. bash
Copy code
mvn spring-boot:run
Project Structure
css
Copy code
## Project Structure

### Frontend

The frontend is developed using React and contains the following structure:

- `frontend/`
  - `public/`: Public assets and static files.
  - `src/`: Source files for the React application.
    - `components/`: React components.
      - `Login.js`: Login component.
      - `Signup.js`: Signup component.
      - `Home.js`: Home page component.
      - `Products.js`: Products page component.
      - `Navbar.js`: Navigation bar component.
    - `App.js`: Main application component.
    - `index.js`: Entry point of the React application.
  - `package.json`: Project dependencies and scripts.
  - `README.md`: Frontend README.

### Backend

The backend is developed using Spring Boot and contains the following structure:

- `backend/`
  - `src/main/java/com/example/demo/`
    - `controller/`: REST controllers.
      - `UserController.java`: Handles user-related requests.
      - `ProductController.java`: Handles product-related requests.
    - `model/`: JPA entities.
      - `User.java`: User entity.
      - `Product.java`: Product entity.
    - `repository/`: JPA repositories.
      - `UserRepository.java`: Repository for user entities.
      - `ProductRepository.java`: Repository for product entities.
    - `service/`: Business logic services.
      - `UserService.java`: Service for user-related operations.
      - `ProductService.java`: Service for product-related operations.
    - `DemoApplication.java`: Main entry point for the Spring Boot application.
  - `pom.xml`: Project dependencies and build configuration.
  - `README.md`: Backend README.
## Usage

Once both the frontend and backend are running:

1. Open your browser and navigate to `http://localhost:3000` to access the frontend application.
2. You can log in, sign up, view products, and manage your shopping experience.

## Contact Us

For any inquiries or feedback, feel free to reach out to us through the following channels:

- Email: [dahood.yazan8@gmail.com](mailto:dahood.yazan8@gmail.com)
- LinkedIn: [Yazan Dahood](https://www.linkedin.com/in/yazan-dahood-031145309/)
- GitHub: [yazandahood8](https://github.com/yazandahood8)

## License


## Contributing


## Acknowledgements

- React for the frontend
- Spring Boot for the backend
