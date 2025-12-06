mployee Shift Board – MERN Stack Project

A complete shift-management system built as part of the internship task for Anshumat Foundation.

The application allows admins to create/manage employee shifts and ensures important business logic like no overlapping shifts and minimum 4-hour shift duration.

🌟 Features
👨‍💼 Admin Features

Login using secure JWT authentication

Create new employee shifts

Delete shifts

View all shifts

Validation rules enforced:

Minimum 4-hour shift

No overlapping shifts for the same employee on the same date

👷‍♂️ Employee Features

Login & view only their assigned shifts

Cannot create or delete shifts

🔐 Authentication

JWT-based login

Role-based access control (Admin / User)

Passwords encrypted with bcrypt

🎨 Frontend UI

Clean, responsive React interface

Dashboard view

Shift Table with action buttons

Modern form-based shift creation flow

🛠️ Tech Stack
Frontend

React.js

Axios

React Router

Custom CSS

Backend

Node.js

Express.js

JWT Authentication

Bcrypt

Middleware for role-based access

Database

MongoDB (Compass / Atlas)

Deployment

Render → Backend

Vercel → Frontend.
How to Run the Project Locally
1. Clone the repositories
git clone <backend-repo-url>
git clone <frontend-repo-url>

2. Backend Setup
cd backend
npm install


Create a .env file:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shiftboard
JWT_SECRET=1234


Run backend:

node server.js

3. Frontend Setup
cd frontend
npm install
npm start

