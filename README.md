# WorkOS Take Home Assignment

## Getting Started

1. **Start the Backend API**:

   - Ensure you have the latest version of Node.js.
   - Run the following commands to install dependencies and start the API:
     ```bash
     cd server
     npm install
     npm run api
     ```

2. **Start the frontend dev server**

- Run the following commands to install dependencies and start the frontend dev server:
  ```bash
   cd server
   npm install
   npm run dev
  ```
- Navigate to `localhost:5173`

3. **Project Setup**: Add your project under the `client` directory.

## Considerations

- Used React/Vite/TS starter scaffolding `npm create vite@latest client -- --template react-ts`

## What I would improve or do differently if I had more time.

1. Add additional CRUD functionality. (Add/Delete role, update default role, add/edit user)
2. Add client-side validation and handle full range of errors from backend (e.g. user not found, user name already exists, etc)
3. Add role searching
4. Add more pagination controls (set page limit, click page, etc)
