# YouTube Clone – MERN Stack

A full-stack YouTube Clone application developed using the MERN Stack. The application allows users to register and log in, browse and search videos, filter videos by category, watch videos, interact using likes/dislikes and comments, and create and manage their own channels and videos.

## Github Link
https://github.com/WitcherxSN/Youtube1.git

## Features

* User registration and login
* JWT-based authentication
* YouTube-style responsive home page
* Responsive sidebar with toggle functionality
* Search videos by title
* Filter videos by category
* Video player page
* Like and dislike functionality
* Add, edit, and delete comments
* Create and manage a channel
* Add, edit, and delete videos
* Dynamic video display
* Responsive design for desktop, tablet, and mobile
* MongoDB database integration

## Technologies Used

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Redux Toolkit
* React Redux
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)




## Authentication

Users can create an account using their username, email, and password.

After successful login, the backend generates a JWT token that is used to authenticate the user and provide access to protected functionality.

## Home Page

The home page contains:

* YouTube-style header
* Search bar
* Toggleable sidebar
* Category filter buttons
* Responsive video grid
* Video thumbnails
* Video titles
* Channel information
* Video views

Users can search for videos by title and filter videos based on their category.

## Video Player

Clicking a video opens the video player page.

The video player page displays:

* Video
* Video title
* Description
* Channel information
* Views
* Like button
* Dislike button
* Comments

Logged-in users can add comments and manage their own comments by editing or deleting them.

## Channel Management

Authenticated users can create their own channel.

The channel page displays information about the channel and its uploaded videos.

Channel owners can:

* Add videos
* View their videos
* Edit videos
* Delete videos

## Search and Filters

The search bar allows users to search for videos based on their title.

Category buttons allow users to filter videos and display videos belonging to the selected category.

## Responsive Design

The application is designed using Tailwind CSS and adapts to different screen sizes including:

* Desktop
* Tablet
* Mobile

## Database

MongoDB is used to store application data including:

* Users
* Channels
* Videos
* Comments

Mongoose is used to create schemas and communicate with MongoDB from the Node.js/Express backend.

## API Functionality

The backend provides APIs for:

* User registration
* User login
* JWT authentication
* Creating and fetching channels
* Creating and fetching videos
* Updating videos
* Deleting videos
* Adding comments
* Fetching comments
* Updating comments
* Deleting comments
* Like and dislike functionality

## Author

**Shravan Naik**

Full Stack Development Capstone Project

## Note

This project was developed as a Full Stack Development capstone project to demonstrate the implementation of a real-world application using React, Node.js, Express.js, MongoDB, JWT authentication, REST APIs, and responsive frontend development.
