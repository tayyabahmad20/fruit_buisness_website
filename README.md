# 🍊 FreshLux Fruits — Premium Fruit Delivery Website

Pakistan's #1 premium fruit delivery service — bringing the freshest produce from farm to your doorstep within hours.

---

## ✨ Features

- **Responsive Landing Page** — Hero section, product cards, box builder, testimonials, delivery tracker
- **Shopping Cart** — Persistent cart with localStorage, slide-in panel, quantity management
- **Build Your Box** — 5kg / 10kg / Custom box selector with fruit picker
- **WhatsApp Order Flow** — One-click order submission via WhatsApp with formatted message
- **Dark Mode** — Full dark/light theme with localStorage persistence
- **GSAP Animations** — Hero entrance, floating fruit emojis, scroll-triggered animations
- **Admin Login** — Secure client-side auth (demo) at `/admin-login.html`
- **Admin Dashboard** — Orders, Products, Analytics with Chart.js charts
- **Express.js Backend** — REST API with MongoDB and JWT authentication
- **Glassmorphism UI** — Backdrop blur cards, gradient backgrounds, custom scrollbar

---

## 🛠 Prerequisites

- Node.js 18+
- MongoDB (local or Atlas URI)
- A modern web browser

---

## 🚀 Installation & Setup

### 1. Clone / open the repository

```bash
cd /home/runner/work/fruit_buisness_website/fruit_buisness_website
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables (optional)

Create `backend/.env`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/freshlux
JWT_SECRET=your-super-secret-key-change-me
```

### 4. Run the backend server

```bash
# Production
npm start

# Development (auto-restart)
npm run dev
```

### 5. Open the website

With the backend running, visit: **http://localhost:3000**

Or open `public/index.html` directly in a browser (frontend works without backend via localStorage).

---

## 🔐 Admin Credentials

| Field    | Value      |
|----------|------------|
| Username | `admin`    |
| Password | `admin123` |
| URL      | `/admin-login.html` |

---

## 🌿 Environment Variables

| Variable       | Default                                  | Description               |
|----------------|------------------------------------------|---------------------------|
| `PORT`         | `3000`                                   | Server port               |
| `MONGODB_URI`  | `mongodb://localhost:27017/freshlux`     | MongoDB connection string |
| `JWT_SECRET`   | *(required in prod)* random fallback | JWT signing secret — always set this in production |

---

## 📁 Project Structure

```
fruit_buisness_website/
├── public/
│   ├── index.html              # Main customer landing page
│   ├── admin-login.html        # Admin login page
│   ├── admin-dashboard.html    # Admin dashboard (orders, products, analytics)
│   ├── css/
│   │   └── styles.css          # Complete stylesheet (dark mode, animations, glassmorphism)
│   └── js/
│       ├── main.js             # Customer site logic (cart, box builder, WhatsApp)
│       └── admin.js            # Admin dashboard logic (CRUD, charts)
├── backend/
│   ├── server.js               # Express app entry point
│   ├── package.json
│   ├── routes/
│   │   ├── auth.js             # POST /api/auth/login
│   │   ├── orders.js           # GET/POST /api/orders, PUT /api/orders/:id/status
│   │   └── products.js         # GET/POST/PUT/DELETE /api/products
│   ├── models/
│   │   ├── Order.js            # Mongoose order schema
│   │   ├── Product.js          # Mongoose product schema
│   │   └── User.js             # Mongoose user schema (with bcrypt)
│   └── middleware/
│       └── auth.js             # JWT authentication middleware
└── README.md
```

---

## 🧰 Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | HTML5, Tailwind CSS CDN, Vanilla JS |
| Animations| GSAP 3, CSS keyframes             |
| Charts    | Chart.js                          |
| Backend   | Node.js, Express.js               |
| Database  | MongoDB, Mongoose                 |
| Auth      | JWT (jsonwebtoken), bcryptjs      |
| Styling   | CSS Variables, Glassmorphism      |

---

## 📞 WhatsApp Orders

Orders are sent to: **+92 300 1234567**

WhatsApp link format: `https://wa.me/923001234567?text=...`

---

## 🎨 Brand Colors

| Name           | Hex       |
|----------------|-----------|
| Primary Green  | `#2d6a4f` |
| Primary Orange | `#f4831f` |
| Accent Cream   | `#fef9f0` |
| Dark           | `#1a1a2e` |

---

## 📜 License

MIT © 2024 FreshLux Fruits