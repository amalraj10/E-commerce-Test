# E-commerce-Test

## Overview
This project is a full-stack application with separate `Backend` and `Frontend` directories. It includes functionality for managing categories and subcategories using MongoDB, Mongoose, and Express on the backend and a modern React-based frontend.

## Prerequisites
- Node.js (v18 or later)
- MongoDB installed and running locally or a cloud MongoDB connection string

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/amalraj10/E-commerce-Test
cd E-commerce-Test
```

### 2. Configure Environment Variables
Create a `.env` file in the `Backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
# Email configuration
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=**** **** **** ****
```

### 3. Install Dependencies

#### Backend
```bash
cd Backend
npm install
```

#### Frontend
```bash
cd Frontend
npm install
```

## Running the Application

### Start the Backend Server
Navigate to the `Backend` directory and run:
```bash
npm start
```
This will start the server on the specified `PORT` in your `.env` file (default: `5000`).

### Start the Frontend
Navigate to the `Frontend` directory and run:
```bash
npm run dev
```
This will start the frontend development server, typically accessible at `http://localhost:3000`.

## Project Structure

### Backend
- **`models/`**: Contains Mongoose schemas and models for Category and SubCategory.
- **`routes/`**: Defines API routes for managing categories and subcategories.
- **`controllers/`**: Handles business logic for category and subcategory operations.
- **`server.js`**: Entry point of the backend application.

### Frontend
- **`src/`**: Contains React components, pages, and utilities.
- **`App.js`**: Entry point for the React application.
- **`public/`**: Static assets for the frontend.

## Available Scripts

### Backend
- **`npm start`**: Start the backend server in production mode.
- **`npm run dev`**: Start the backend server with live reload using `nodemon`.

### Frontend
- **`npm start`**: Start the frontend server in development mode.
