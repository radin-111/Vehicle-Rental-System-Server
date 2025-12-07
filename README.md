# 🚗 Vehicle Rental System – Server

# Live Link: **[https://vehicle-rental-system-ten.vercel.app/](https://vehicle-rental-system-ten.vercel.app/)**

A backend API for managing a complete vehicle rental system. Built with **TypeScript**, **Express.js**, and **PostgreSQL**.

---

## 🛠️ Technology Stack

* **Language:** TypeScript
* **Framework:** Express.js
* **Database:** PostgreSQL

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/radin-111/Vehicle-Rental-System-Server.git
```

### 2. Navigate to the Project Folder

```bash
cd Vehicle-Rental-System-Server
```

### 3. Install Dependencies

Make sure **Node.js** and **npm** are installed.

```bash
npm install
```

### 4. Create a `.env` File in the Root Directory

Add the following environment variables:

```
PORT=your_port
JWT_SECRET=your_secret_key
CONNECTION_STRING=your_postgresql_uri
```

### 5. Start the Development Server

```bash
npm run dev
```

If everything is configured properly, the server will start successfully.

---

## 🚀 API Usage

### 🔐 Authentication

#### **Signup**

**POST** `/api/v1/auth/signup`

**Request Body**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "phone": "01712345678",
  "role": "customer"
}
```

---

#### **Signin**

**POST** `/api/v1/auth/signin`

**Request Body**

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

After successful login, use the token:

```
Authorization: Bearer <jwt_token>
```

---

## 🚘 Vehicles API

#### **Create a Vehicle**

**POST** `/api/v1/vehicles`

**Request Body**

```json
{
  "vehicle_name": "Toyota Camry 2024",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 50,
  "availability_status": "available"
}
```

---

#### **Get All Vehicles**

**GET** `/api/v1/vehicles`

---

#### **Get a Single Vehicle**

**GET** `/api/v1/vehicles/:vehicleId`
Example: `/api/v1/vehicles/2`

---

#### **Update a Vehicle**

**PUT** `/api/v1/vehicles/:vehicleId`
Example: `/api/v1/vehicles/1`

**Request Body**

```json
{
  "vehicle_name": "Toyota Camry 2024 Premium",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 55,
  "availability_status": "available"
}
```

---

#### **Delete a Vehicle**

**DELETE** `/api/v1/vehicles/:vehicleId`
Example: `/api/v1/vehicles/1`

---

## 👤 Users API

#### **Get All Users**

**GET** `/api/v1/users`

---

#### **Update a User**

**PUT** `/api/v1/users/:userId`
Example: `/api/v1/users/1`

**Request Body**

```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "phone": "+1234567899",
  "role": "admin"
}
```

---

#### **Delete a User**

**DELETE** `/api/v1/users/:userId`
Example: `/api/v1/users/1`

---

## 📅 Bookings API

#### **Create a Booking**

**POST** `/api/v1/bookings`

**Request Body**

```json
{
  "customer_id": 1,
  "vehicle_id": 2,
  "rent_start_date": "2024-01-15",
  "rent_end_date": "2024-01-20"
}
```

---

#### **Get Bookings**

**GET** `/api/v1/bookings`
(Shows your own bookings or all bookings depending on role)

---

#### **Update Booking Status**

**PUT** `/api/v1/bookings/:bookingId`
Example: `/api/v1/bookings/1`

**Request Body (Choose one)**

```json
{
  "status": "cancelled"
}
```

```json
{
  "status": "returned"
}
```

---


