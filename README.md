# Digital-Dinner
The Digital Diner" is a small, popular restaurant looking to improve its customer experience by allowing users to browse their menu and place simple pickup orders online. They need a basic web application to facilitate this. You have been tasked with building a prototype of this system.

A responsive full-stack food ordering application built with **React + Express**, using **MongoDB Atlas** for menu storage and **Render PostgreSQL** for order tracking.

Frontend:

---
Landing Page : ![Screenshot_29-4-2025_15617_localhost](https://github.com/user-attachments/assets/df25647d-ac0b-447c-a80b-295f01be623f)
CartPage: ![Screenshot_29-4-2025_15638_localhost](https://github.com/user-attachments/assets/e31e7e91-8392-4307-bc19-dea9ec401caf)
SingleProductPage: ![Screenshot_29-4-2025_1578_localhost](https://github.com/user-attachments/assets/43aa7be6-a4d1-413d-a389-a1757b5e2173)
OrderHistory Page: ![Screenshot_29-4-2025_15652_localhost](https://github.com/user-attachments/assets/90afa21a-b920-4379-b27e-0bc503c155eb)

> Live Frontend: [https://verdant-crepe-1fd420.netlify.app](https://verdant-crepe-1fd420.netlify.app)  
> Live Backend: [https://digital-dinner-4yb8.onrender.com](https://digital-dinner-4yb8.onrender.com)

---

## 🔧 Tech Stack

- **Frontend**: React, Tailwind CSS, Axios, Toastify
- **Backend**: Node.js, Express
- **Databases**:
  - **MongoDB Atlas** (for menu data)
  - **Render PostgreSQL** (for order data)
- **Deployment**:
  - Frontend on **Netlify**
  - Backend on **Render**
    
---

## 🚀 Features

- View all menu items categorized by type (e.g., Main Course, Desserts)
- Add items to cart with quantity management
- Place orders with name and phone number
- View past orders based on phone number
- Responsive and mobile-friendly UI
- Toast notifications for cart and order feedback


---

## 🛠️ Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/Digital-Dinner.git
cd Digital-Dinner
```
## 2. Setup MongoDB (for menu)

- Create a free MongoDB Atlas account.
- Create a cluster and database named fooddata.
- In /backend/.env, add:
  ```bash
  MONGO_URI=<your_mongodb_uri>
  ```
## 🧾 MongoDB Schema Structure

Each `menuitems` document follows this format:

```json
{
  "name": "Item Name",
  "description": "Item description",
  "price": 150,
  "category": "Main Course | Desserts | Drinks | etc.",
  "imageUrl": "https://example.com/image.jpg"
}
```

## 3. Setup PostgreSQL (for orders)
- Create a free PostgreSQL database on Render.
- In Render Dashboard → Web Service → Environment Variables, add:
    ```bash
  POSTGRES_URI=postgresql://<user>:<password>@<host>:<port>/<database>
  ```
- Ensure your backend either:
  - Calls a table creation function on startup or
  - Create it manually via pgAdmin:
    
  ```bash
  CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(15),
  cart_items JSONB,
  total_price NUMERIC(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```
## 4. Run the Backend Locally
```bash
  cd backend
  npm install
  npm run dev
```
## 5. Run the Frontend Locally
```bash
cd frontend
npm install
npm run dev
```
# 🌐 API Endpoints

## Menu (MongoDB)
  ### GET /api/menu → Fetch all menu items (https://digital-dinner-4yb8.onrender.com/api/menu)
  ### GET /api/menu/:id → Fetch a specific menu item (optional)

## Orders (PostgreSQL)
  ### POST /api/orders → Create a new order
  ### GET /api/orders/:phone → Get past orders by phone number

## ⚠️ Challenges Faced

PostgreSQL on Render required 
```bash 
ssl: { rejectUnauthorized: false }
```
MongoDB import required JSON formatting with --jsonArray

Had to carefully manage environment-based API switching (local vs deployed)

Dual-database setup required thoughtful folder & connection organization

## ✨ Credits
Built by [Bamla Varun Singh]
Using modern full-stack practices and cloud deployment architecture.

## 📬 Contact
If you have questions, feel free to open an issue or reach out at:
vaarunsingghh@gmail.com
  
