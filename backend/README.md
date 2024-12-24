# CourseVault Backend

A TypeScript-based Express backend for the CourseVault learning platform.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Zod (for validation)
- JWT (for authentication)
- bcrypt (for password hashing)

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following variables:

```env
ADMIN_JWT_SECRET=sec3ret_admin
USER_JWT_SECRET=sec3ret_user
MONGODB_URL=mongodb://localhost:27017/course-selling
PORT=8080
```

4. Start the development server:

```bash
npm run dev
```

## Authentication

Protected routes use JWT tokens stored in HTTP-only cookies for authentication. The middleware functions `userMiddleware` and `adminMiddleware` are used to verify tokens and authorize users and admins, respectively.

## API Endpoints

### User Routes

#### POST `/api/v1/user/signup`

- **Description**: Register a new user
- **HTTP Method**: POST
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User created successfully",
    "userId": "user_id",
    "email": "user@example.com"
  }
  ```

#### POST `/api/v1/user/signin`

- **Description**: User login
- **HTTP Method**: POST
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Logged in successfully",
    "userId": "user_id",
    "email": "user@example.com"
  }
  ```

#### POST `/api/v1/user/logout`

- **Description**: User logout
- **HTTP Method**: POST
- **Response**:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### GET `/api/v1/user/profile`

- **Description**: Get user profile
- **HTTP Method**: GET
- **Response**:
  ```json
  {
    "user": {
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "coursesOwned": [],
      "purchases": []
    }
  }
  ```

#### PUT `/api/v1/user/update`

- **Description**: Update user information
- **HTTP Method**: PUT
- **Request Body**:
  ```json
  {
    "email": "newemail@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "newpassword123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User updated successfully",
    "userId": "user_id",
    "email": "newemail@example.com"
  }
  ```

#### POST `/api/v1/user/purchase/:courseId`

- **Description**: Purchase a course
- **HTTP Method**: POST
- **Request Params**:
  - `courseId`: ID of the course to be purchased
- **Example Request**:
  ```bash
  POST /api/v1/user/purchase/60d21b4667d0d8992e610c85
  ```
- **Response**:
  ```json
  {
    "message": "Course purchased successfully",
    "purchaseId": "purchase_id",
    "userId": "user_id"
  }
  ```

#### GET `/api/v1/user/purchased`

- **Description**: Get all purchased courses
- **HTTP Method**: GET
- **Response**:
  ```json
  {
    "purchases": [
      {
        "courseId": "course_id",
        "userId": "user_id"
      }
    ]
  }
  ```

#### GET `/api/v1/user/check/:courseId`

- **Description**: Check if course is already purchased
- **HTTP Method**: GET
- **Request Params**:
  - `courseId`: ID of the course to check
- **Example Request**:
  ```bash
  GET /api/v1/user/check/60d21b4667d0d8992e610c85
  ```
- **Response**:
  ```json
  {
    "purchased": true,
    "message": "Course already purchased"
  }
  ```

### Admin Routes

#### POST `/api/v1/admin/signup`

- **Description**: Register a new admin
- **HTTP Method**: POST
- **Request Body**:
  ```json
  {
    "email": "admin@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "password": "adminpassword123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Admin created successfully",
    "adminId": "admin_id",
    "email": "admin@example.com"
  }
  ```

#### POST `/api/v1/admin/signin`

- **Description**: Admin login
- **HTTP Method**: POST
- **Request Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "adminpassword123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Logged in successfully",
    "adminId": "admin_id",
    "email": "admin@example.com"
  }
  ```

#### POST `/api/v1/admin/course`

- **Description**: Create a new course
- **HTTP Method**: POST
- **Request Body**:
  ```json
  {
    "title": "Course Title",
    "description": "Course Description",
    "price": 100,
    "imageUrl": "http://example.com/image.png"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Course created successfully",
    "courseId": "course_id",
    "course": {
      "title": "Course Title",
      "description": "Course Description",
      "price": 100,
      "imageUrl": "http://example.com/image.png"
    }
  }
  ```

#### PUT `/api/v1/admin/course/:courseId`

- **Description**: Update a course
- **HTTP Method**: PUT
- **Request Params**:
  - `courseId`: ID of the course to be updated
- **Request Body**:
  ```json
  {
    "title": "Updated Course Title",
    "description": "Updated Course Description",
    "price": 150,
    "imageUrl": "http://example.com/newimage.png"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Course updated successfully",
    "updatedCourse": {
      "title": "Updated Course Title",
      "description": "Updated Course Description",
      "price": 150,
      "imageUrl": "http://example.com/newimage.png"
    }
  }
  ```

#### DELETE `/api/v1/admin/course/:courseId`

- **Description**: Delete a course
- **HTTP Method**: DELETE
- **Request Params**:
  - `courseId`: ID of the course to be deleted
- **Response**:
  ```json
  {
    "message": "Course was successfully deleted"
  }
  ```

#### GET `/api/v1/admin/earnings`

- **Description**: Get admin earnings
- **HTTP Method**: GET
- **Response**:
  ```json
  {
    "message": "Earnings calculated successfully",
    "totalEarnings": 1000
  }
  ```

#### GET `/api/v1/admin/profile`

- **Description**: Get admin profile
- **HTTP Method**: GET
- **Response**:
  ```json
  {
    "admin": {
      "email": "admin@example.com",
      "firstName": "Jane",
      "lastName": "Doe",
      "coursesCreated": []
    }
  }
  ```

#### GET `/api/v1/admin/courses`

- **Description**: Get all courses created by the admin
- **HTTP Method**: GET
- **Response**:
  ```json
  {
    "message": "Courses fetched successfully",
    "courses": [
      {
        "title": "Course Title",
        "description": "Course Description",
        "price": 100,
        "imageUrl": "http://example.com/image.png"
      }
    ]
  }
  ```

### Course Routes

#### GET `/api/v1/course`

- **Description**: Get all courses
- **HTTP Method**: GET
- **Response**:
  ```json
  {
    "courses": [
      {
        "title": "Course Title",
        "description": "Course Description",
        "price": 100,
        "imageUrl": "http://example.com/image.png",
        "creatorId": "admin_id"
      }
    ]
  }
  ```

#### GET `/api/v1/course/:courseId`

- **Description**: Get a specific course
- **HTTP Method**: GET
- **Request Params**:
  - `courseId`: ID of the course to retrieve
- **Example Request**:
  ```bash
  GET /api/v1/course/60d21b4667d0d8992e610c85
  ```
- **Response**:
  ```json
  {
    "course": {
      "title": "Course Title",
      "description": "Course Description",
      "price": 100,
      "imageUrl": "http://example.com/image.png",
      "creatorId": "admin_id"
    }
  }
  ```
