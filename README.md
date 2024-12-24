# CourseVault

CourseVault is a comprehensive learning platform that includes both a frontend and a backend. The frontend is built with React and TypeScript, while the backend is built with Express and TypeScript.

## Repositories

- [Frontend](./frontend/README.md)
- [Backend](./backend/README.md)

## Tech Stack

### Frontend

- React.js
- TypeScript
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Zod (for validation)
- JWT (for authentication)
- bcrypt (for password hashing)

## Setup

### Frontend

1. Clone the repository
2. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file with the following variables:

   ```env
   VITE_API_URL=http://localhost:8080/api/v1
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

For more details, refer to the [Frontend README](./frontend/README.md).

### Backend

1. Clone the repository
2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file with the following variables:

   ```env
   ADMIN_JWT_SECRET=sec3ret_admin
   USER_JWT_SECRET=sec3ret_user
   MONGODB_URL=mongodb://localhost:27017/course-selling
   PORT=8080
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

For more details, refer to the [Backend README](./backend/README.md).

## Project Structure

- `frontend`: Contains the React-based frontend application
- `backend`: Contains the Express-based backend application
