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

   - Navigate to `localhost:5173` (or whatever url Vite specifies)

## Considerations

- Used React/Vite/TS starter scaffolding `npm create vite@latest client -- --template react-ts`
- On the first pass, I wired up all functionality using simple fetching and React state. To use a more robust and scalable option (and to give me exposure to the lib), I migrated the app to React Query with custom hooks. It provides much of the desired functionality we need, including caching, refetching, invalidating, pagination, etc.

## What I would improve or do differently if I had more time

1. Add additional CRUD functionality. (Add/Delete role, update default role, edit user)
2. Add url state routing (persist active tab, search value, etc)
3. Currently not handling pagination for roles. For cases like the role select dropdown in the Add User modal, or the role name in the user list, we need all the roles. With the currently available endpoints, we would need to loop through and request every page.
4. Add client-side validation and handle full range of errors from backend (e.g. user not found, user name already exists, etc)
5. Add more pagination controls (set page limit, click page, etc)
6. Optimistic state updates
7. Create a more reusable Table component, or use something like Tanstack Table.
8. Warnings when performing certain actions (e.g. deleting/editing a role when there are attached users.)

## Tasks Overview

- [x] Setup the "Users" and "Roles" tab structure
- [x] Add the users table
- [x] Add support for filtering the users table via the "Search" input field
- [x] Add support for deleting a user via the "more" icon button dropdown menu
- [x] Add support for viewing all roles in the "Roles" tab
- [x] Add support for renaming a role in the "Roles" tab

Bonus tasks

- [x] [Bonus] Add pagination to the user table
- [x] [Bonus] + Add User feature
- [x] [Bonus] + Search roles functionality
- [x] [Bonus] + Edit role description
