# Course selling Application

CourseSellingApp is a comprehensive solution designed to facilitate the selling and purchasing of educational courses online. This project is divided into two main components: a client-side application built with React, and a server-side application running on Node.js.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (version 12.x or higher)
- npm (comes with Node.js)

## Setting Up the Project

### Server-side Application Setup

1. **Navigate to the Server Directory**: Change into the server directory from the root of the project.
2. **Install Dependencies**: Run the following command to install the necessary Node.js dependencies.
3. **Configuration**: Edit the `server/config/config.js` file to update the database and other environment-specific configurations as per your setup.
4. **Start the Server**: Run the server using the following command.

```bash
npm install &&
node index.js
```
The server will start on the default port defined in your configuration file or port 3000 if no port is specified.

### Client-side Application Setup

1. **Navigate to the Client Directory**: Change into the client directory from the root of the project.

2. **Install Dependencies**: Like with the server, install the Node.js dependencies for the client.

3. **Running the Client Application**: Start the React application with the following command.

```bash
npm install &&
npm run dev
```
This will launch the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

After setting up both the server and client applications, you can start using the CourseSellingApp by navigating to [http://localhost:5173](http://localhost:5173) in your web browser. From there, you can explore the functionalities provided by the application, such as browsing available courses, signing up for an account, or adding new courses if you're an admin.

## Contributing

Contributions to CourseSellingApp are welcome! If you're interested in improving the application, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
