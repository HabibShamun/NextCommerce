
# NextCommerce
NextCommerce is a full-stack e-commerce application built with **Next.js (client)** and **Express.js (server)**.  
It includes product listing, product detail pages, authentication (Firebase email + Google), and product management features.


## Features
- User authentication (Email/Password + Google OAuth via Firebase)
- Product listing and detail pages
- Manage products (CRUD operations via Express + MongoDB)
- Styled with TailwindCSS + DaisyUI
- Responsive design
- Toast notifications for actions (login, register, delete, etc.)
## Prerequisites

- Node.js (v18 or later recommended)
- npm
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)
- Firebase project (for authentication)
## Client Setup (Next.js)
1. Navigate to the client folder:
   ```bash
   cd client
## Install dependencies:

```bash
npm install
```
## Create a .env.local file in client/
You Need to get the .env file from me
## Run the client in development
```bash
npm run dev
```
## Server Setup (Express.js)
Navigate to the server folder:
```bash
cd server
```
## Install dependencies:

```bash
npm install
```
## Install dependencies:

```bash
npm install
```
## Install dependencies server:

```bash
npm install
```
## Create a .env file in server/:
You Need to get the .env file from me
## Run the server:
```bash
nodemon index.js
```
The server will run at http://localhost:5000.
## Running the Full Project:

Start the server:
```bash
cd server
nodemon index.js
```

In another terminal, start the client:
```bash
cd client
npm run dev
```
Open http://localhost:3000 in your browser. The client will fetch product data from http://localhost:5000/products.
## Deployment

Client (Next.js): Deploy easily on Vercel.

Server (Express.js): Deploy on Netlify, Railway, or Vercel.

Make sure to update API URLs in the client to point to your deployed server.