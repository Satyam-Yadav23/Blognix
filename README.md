# Blognix

A simple blog application built with Node.js, Express, MongoDB, EJS, and Bootstrap.

## Features

- User signup and signin
- Blog creation with cover image upload
- Blog listing on the home page
- Read individual blog posts
- Add comments on blog posts
- Protected routes for authenticated actions

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- EJS templates
- Bootstrap 5
- Multer for file uploads
- JWT for authentication

## Project Structure

```bash
.
├── index.js
├── package.json
├── .env
├── controllers/
├── middlewares/
├── models/
├── public/
│   ├── images/
│   └── uploads/
├── routes/
├── services/
├── views/
│   ├── partials/
│   ├── addBlog.ejs
│   ├── blog.ejs
│   ├── home.ejs
│   ├── signin.ejs
│   └── signup.ejs
└── README.md
```

## Prerequisites

- Node.js installed
- MongoDB Atlas connection or local MongoDB instance

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with the following values:

```bash
ATLAS_URI=your_mongodb_connection_string
SECRET=your_jwt_secret
```

3. Make sure the `public/uploads` folder exists:

```bash
mkdir -p public/uploads
```

## Run the app

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The app will run on:

```bash
http://localhost:3000
```

## Notes

- Authenticated users can create blogs and comment.
- Unauthenticated users are redirected to the sign-in page when trying to access protected routes.
- Uploaded image files are saved in the `public/uploads` folder.

## License

This project is for educational and personal use.
