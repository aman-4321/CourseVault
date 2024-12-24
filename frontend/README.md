# CourseVault Frontend

A React-based frontend for the CourseVault learning platform.

## Tech Stack

- React.js
- TypeScript
- React Router
- Axios
- Tailwind CSS

## Setup

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

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `npm run build`

Builds the app for production to the `dist` folder.

## Project Structure

- `src/components`: Reusable components
- `src/pages`: Page components
- `src/context`: Context for global states
- `src/hooks`: hooks used for fetching apis
- `src/services`: API service functions
- `src/App.tsx`: Main application component

## Routing

The application uses React Router for client-side routing. The main routes are:

- `/home`: Home page
- `/user-signup`: User signup page
- `/user-signin`: User signin page
- `/courses`: Explore courses page
- `/course/:courseId`: Course details page
- `/purchased`: User purchased courses page (protected)
- `/admin-signup`: Admin signup page
- `/admin-signin`: Admin signin page
- `/admin-dashboard`: Admin dashboard (protected)
- `/create-course`: Create course page (protected)

## Authentication

Protected routes use wrappers (`UserProtectedWrapper` and `AdminProtectedWrapper`) to ensure that only authenticated users or admins can access certain pages.
