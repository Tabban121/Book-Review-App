# 📚 Book Review App – Backend

This is the backend of the **Book Review App**, built with **TypeScript**, **Express.js**, and **MongoDB**. It provides a secure and scalable RESTful API to support book listings, user management, and book reviews.

---

## 📌 Table of Contents

- Features
- Tech Stack
- Folder Structure
- Getting Started
- Environment Variables
- Available Scripts
- API Endpoints
- Security Features
- License

---

## 🚀 Features

- User registration and login (token-based authentication)
- Create, read, update, delete books
- Submit and manage reviews for books
- Prevent users from reviewing their own books
- MongoDB integration using Mongoose
- Modular code with TypeScript interfaces, DTOs, and middleware

---

## 🧰 Tech Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (or custom session token)
- **Validation:** Custom middleware or class-validator
- **Environment Management:** dotenv

---
## ⚙️ Getting Started



### 1. Install Dependencies

npm install

yaml
Copy
Edit

---

## 🔐 Environment Variables

Create a `.env` file in the root with the following values:

---

## 📦 Available Scripts

- `npm run dev` – Start development server with nodemon
- `npm run build` – Compile TypeScript files to JavaScript
- `npm run start` – Start production server

---

## 🔗 API Endpoints

### ✅ Auth

- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – Login and receive a token  

### 📚 Books

- `GET /api/books` – Get all books  
- `POST /api/books` – Create a new book (auth required)  
- `GET /api/books/:id` – Get book by ID  
- `PUT /api/books/:id` – Update book (owner only)  
- `DELETE /api/books/:id` – Delete book (owner only)  

### ✍️ Reviews

- `POST /api/reviews` – Create a review for a book  
- `GET /api/reviews/book/:bookId` – Get all reviews for a book  

---

## 🔒 Security Features

- Secure password hashing using **bcrypt**
- Authentication using **JWT** or session tokens
- Input validation middleware
- Users cannot review their own books
- Extendable role-based access logic

---


