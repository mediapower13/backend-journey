# Request Validation & Data Sanitization

Complete validation and sanitization system for user registration and blog post creation.

## Features

- **Basic Validators**: Email format, password strength, required fields
- **Custom Validators**: Unique emails, age restrictions, content length, categories, tags
- **Sanitization**: HTML escaping, string trimming, email normalization, whitespace handling
- **Validation Middleware**: User registration and blog post validation
- **In-Memory Stores**: User and post repositories

## Endpoints

### Users
- `POST /users/register` - Register a new user
- `GET /users` - List all users
- `GET /users/:id` - Get user by ID

### Posts
- `POST /posts` - Create a blog post
- `GET /posts` - List all posts
- `GET /posts/:id` - Get post by ID
- `PATCH /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

## Run

```bash
npm install
npm start
```

## Validation Rules

### User Registration
- Email: must be valid format
- Password: min 8 chars, must contain uppercase, number, special char
- Name: required, non-empty
- Age: optional, 0-150
- Email must be unique

### Blog Post
- Title: 3-200 characters
- Content: 10-5000 characters
- Category: tech, lifestyle, travel, food, or other
- Tags: array, max 10 items, each 1-50 characters
