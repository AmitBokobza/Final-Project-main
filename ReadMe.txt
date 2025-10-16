Recipe Showcase
A full-stack web application for uploading, sharing, and discovering delicious recipes. Built with a modern tech stack featuring role-based access control and a beautiful, responsive user interface.
Table of Contents

Features

Recipe Management: Upload, view, edit, and delete recipes with detailed information and images
Role-Based Access Control: Three user types with different permission levels
User Authentication: Secure login and registration system
Dark/Light Theme: Seamless theme switching with persistent preferences
Responsive Design: Fully responsive interface that works on all devices
Search & Discovery: Browse through a curated collection of recipes
User Profiles: Personal profile pages with contact and address information
Admin Dashboard: Comprehensive user management system for administrators

Tech Stack
Frontend

React with TypeScript
React Router for navigation
Formik & Yup for form handling and validation
Tailwind CSS for styling
Context API for state management

Backend

Node.js with Express
MongoDB for database
JWT for authentication
RESTful API architecture

User Roles
Personal User

View all recipes in the showcase
Browse recipe details
Search through available recipes
Access to public content only

Cook User
All Personal User permissions, plus:

Upload new recipes with images and detailed information
Edit and delete their own recipes
Like/favorite recipes
Access "My Recipes" section to manage created recipes
Access "Liked Recipes" section to view favorited recipes
Full profile management

Admin User
All Cook User permissions, plus:

Edit any recipe in the system
Delete any recipe in the system
View all registered users
Delete user accounts
View user details and profiles
Full system management capabilities