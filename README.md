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
   cd client
   npm install
   npm run dev
  ```
- Navigate to `localhost:5173`

## Considerations

- Used React/Vite/TS starter scaffolding `npm create vite@latest client -- --template react-ts`
- On the first pass, I

## What I would improve or do differently if I had more time.

1. Add additional CRUD functionality. (Add/Delete role, update default role, add/edit user)
2. Add url state routing (persist active tab, search value, etc)
3. Add client-side validation and handle full range of errors from backend (e.g. user not found, user name already exists, etc)
4. Add more pagination controls (set page limit, click page, etc)
5. Optimistic state updates
6. Create a more reusable Table component, or use something like Tanstack/Table.

## Tasks Overview

- [x] Setup the "Users" and "Roles" tab structure
- [x] Add the users table
- [x] Add support for filtering the users table via the "Search" input field
- [x] Add support for deleting a user via the "more" icon button dropdown menu
- [x] Add support for viewing all roles in the "Roles" tab
- [x] Add support for renaming a role in the "Roles" tab

Bonus tasks

- [x] [Bonus] Add pagination to the user table
- [x] [Bonus] Roles search functionality
- [x] [Bonus] Edit role description
