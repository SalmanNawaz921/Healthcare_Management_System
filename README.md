# HealthPulse

## Overview

Healthcare Management System is a comprehensive solution designed to streamline various healthcare-related tasks and information management. It provides an efficient and user-friendly interface for managing patient information, appointments, medical records, and other essential healthcare operations. This project leverages modern web technologies to deliver a robust and scalable application.

## Technologies Used

- **Frontend**:
  - **React JS**: A JavaScript library for building user interfaces.
  - **Redux Toolkit**: A toolset for efficient Redux development.
  - **React Query**: A library for fetching, caching, and updating asynchronous data in React.
  - **Ant Design**: A design system with a set of high-quality React components.
  - **Tailwind CSS**: A utility-first CSS framework for styling.

- **Backend**:
  - **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
  - **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
  - **Microsoft SQL Server**: A relational database management system for data storage and retrieval.

## Features

- **Users**: There are four users Main Admin, Hospital Admin, Doctor and Patient each having their own functionalities.
- **Patient Management**: Efficiently manage patient records, including personal information, medical history, and current health status.
- **Appointment Scheduling**: Schedule, reschedule, and cancel appointments with ease.
- **Medical Records**: Store and retrieve comprehensive medical records.
- **User Authentication**: Secure user authentication and authorization mechanisms.
- **Responsive Design**: A fully responsive interface that works seamlessly across different devices.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14.x or higher)
- npm (v6.x or higher) or Yarn (v1.x or higher)
- Microsoft SQL Server

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/salmannawaz921/Healthcare_Management_System.git
    cd Healthcare_Management_System
    ```

2. **Install frontend dependencies**:
    ```sh
    cd frontend
    npm install
    ```

3. **Install backend dependencies**:
    ```sh
    cd ../backend
    npm install
    ```

### Configuration

1. **Configure the database**:
    - Set up a new database in Microsoft SQL Server.
    - Update the database configuration in `backend/db/dbConfig.js` with your SQL Server connection details.

2. **Environment variables for backend**:
    - Create a `.env` file in the `backend` directory.
    - Add the following environment variables:
      ```env
      PORT=8080
      USER_NAME=yourDatabaseUser
      PASSWORD=yourDatabasePassword
      DATABASE=yourDatabaseName
      SERVER_NAME=yourDatabaseServer
      AUTH_KEY=yourJWTSecret
      ```
      
2. **Environment variables for frontend**:
    - Create a `.env` file in the `frontend` directory.
    - Add the following environment variables:
      ```env
      VITE_API_URL="http://localhost:8080/api"
      ```

### Running the Application

1. **Start the frontend and backend servers**:
    ```sh
    cd frontend
    npm run both
    ```

2. **Access the application**:
    - Open your browser and navigate to `http://localhost:5173`.

## Usage

- **Admin Panel**: Access the admin panel to manage users, appointments, and medical records.
- **Patient Portal**: Patients can log in to view their medical records and upcoming appointments.
- **Doctor Dashboard**: Doctors can view and update patient records, and manage their appointment schedules.

## Contributing

We welcome contributions to improve the Healthcare Management System. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

I would like to thank Sir Syed Khaldoon for his valuable guidence throughout the project.

---

Feel free to reach out if you have any questions or need further assistance. Enjoy using the Healthcare Management System!
