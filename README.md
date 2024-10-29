# Superhero Database

A web application to manage and explore a database of superheroes. This solution includes a React front end (using Vite) and a Node.js back end with Express.

## Features

- CRUD operations for superheroes
- Superhero details and image gallery
- Pagination for superhero list
- Image upload and management
- Responsive design

## Prerequisites

- Node.js
- npm or yarn
- MongoDB (local or cloud instance)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/daladers/superhero-database.git
cd superhero-database
```
## Environment Variables

### Server .env
In the server directory, create a .env file with the following variables:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/superheroes # or your MongoDB URI
```

## Install Dependencies
### Install dependencies for both the client and the server.

```bash
# In the root directory
cd superhero-client
npm install # or yarn install

cd ../superhero-server
npm install # or yarn install
```
## Run the Application
To start the app, begin by running the server, then start the client.

Start the Server
```bash
cd superhero-server
npm run dev
```
The server will run on http://localhost:3000 by default.

Start the Client
```bash
cd superhero-client
npm run dev
```
The client will be available on http://localhost:5173 by default.

## Folder Structure
superhero-client/: Contains the React front end built with Vite.
superhero-server/: Contains the Node.js back end using Express.

## Contributing
Feel free to fork the repository, create a new branch, and submit pull requests.
