
# NestFind

NestFind is a full-stack web application for managing real estate listings with functionalities for both property owners and tenants. The project uses React.js for the frontend and Python Flask for the backend. The application  includes features such as user authentication, listing management, and CRUD operations.

# Login/Register Page
![Screenshot 2024-06-10 161031](https://github.com/user-attachments/assets/895438b1-0461-49f3-86ec-033bac30fb0b)

![Screenshot 2024-06-10 161045](https://github.com/user-attachments/assets/ac99e6f1-67c9-4d04-8dee-afa340a1fb6b)

# Home Page
![Screenshot 2024-07-12 155344](https://github.com/user-attachments/assets/b76f53c1-9e63-4a02-857a-8ae8970f3308)

# Listing Pages

# Tenant User Listing type
![Screenshot 2024-07-12 155525](https://github.com/user-attachments/assets/e2912c09-9658-4914-ad24-584679f3c6fb)
![Screenshot 2024-07-12 155546](https://github.com/user-attachments/assets/45333dff-371e-4794-8ab8-8f4635e92c6d)
![Screenshot 2024-07-12 155600](https://github.com/user-attachments/assets/81d04c53-ffbf-4525-99a5-039e3664ffac)

# Owner User Listing Page Type
![Screenshot 2024-07-12 155407](https://github.com/user-attachments/assets/80483126-07b8-4e66-a489-ed1dabb3f96f)
![Screenshot 2024-07-12 155423](https://github.com/user-attachments/assets/ab2b413e-c5cd-46c7-8a86-7e89d5383378)
![Screenshot 2024-07-12 155442](https://github.com/user-attachments/assets/0520ebf1-7020-4e59-8516-3d8c95ad8dc5)

# Logout 
![Screenshot 2024-07-12 155630](https://github.com/user-attachments/assets/17013908-f5aa-4ecf-a9e5-d65c12851e9a)


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure login and registration for property owners and tenants.
- **Listing Management**: Owners can add, edit, and delete property listings.
- **Search and Filter**: Tenants can search and filter properties based on various criteria.
- **Image Upload**: Supports uploading property images in PNG or JPG format.
- **Responsive Design**: The application is responsive and works on both desktop and mobile devices.


## Technologies Used

- **Frontend**: React.js, Material-UI, Axios
- **Backend**: Python, Flask, SQLAlchemy, JWT
- **Database**: MySQL

## Installation

### Prerequisites

- Node.js
- Python 3.x
- MySQL

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/nestfind.git
    cd nestfind/backend
    ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up the database:
    ```bash
    flask db init
    flask db migrate
    flask db upgrade
    ```

5. Run the backend server:
    ```bash
    flask run
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the frontend server:
    ```bash
    npm start
    ```

## Usage

1. Access the application at `http://localhost:3000`.
2. Register as a new user or log in with existing credentials.
3. As an owner, manage property listings by adding, editing, or deleting properties.
4. As a tenant, search and filter properties based on your preferences.

## API Endpoints

### Auth

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in an existing user.

### Listings

- `GET /api/listings`: Get all property listings.
- `POST /api/listings`: Create a new property listing.
- `PUT /api/listings/:id`: Update a property listing.
- `DELETE /api/listings/:id`: Delete a property listing.

### Images

- `POST /api/images/upload`: Upload an image for a property.

## Folder Structure

```
nestfind/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── routes.py
│   │   ├── schemas.py
│   │   ├── config.py
│   │   └── ...
│   ├── migrations/
│   ├── venv/
│   ├── requirements.txt
│   └── run.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── home/
│   │   │   ├── auth/
│   │   │   └── magicui/
│   │   │       └── Globe.tsx
│   │   ├── contexts/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── ...
│
└── README.md
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.


git remote add origin https://github.com/kaliprasadkunche/NestFind.git
git branch -M main
git push -u origin main
