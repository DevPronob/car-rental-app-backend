# 🚖 Ride Booking System (Full Stack)

A secure, scalable, and role-based Ride Booking Platform (like Uber or Pathao) built with **Node.js, Express, MongoDB, React, Redux Toolkit, and RTK Query**.

---

## 🔹 Backend (API)

### Features
- JWT Authentication & Bcrypt Password Hashing
- Role-based Access (Admin, Rider, Driver)
- Rider: Request/Cancel rides, View history
- Driver: Approval required, Accept/Reject rides, Online/Offline, Earnings
- Admin: Manage users/drivers, Approve/Suspend, View all rides
- Ride Lifecycle: `requested → accepted → picked_up → in_transit → completed`

### Tech Stack
- **Node.js, Express.js, MongoDB, Mongoose, TypeScript**
- **Zod** (Validation), **JWT**, **Bcrypt**
- **Postman** (API Testing)

### Sample Endpoints
- `POST /api/v1/auth/register` → Register user  
- `POST /api/v1/rides/request` → Rider requests ride  
- `PATCH /api/v1/rides/:id/accept` → Driver accepts ride  
- `GET /api/v1/users` → Admin gets all users  

---

## 🔹 Frontend (React + Redux Toolkit + RTK Query)

### Core Features
- Fully **responsive** design (mobile-first, tablet, desktop)
- Role-based dashboards:
  - **Rider**: Request rides, track rides, history, profile  
  - **Driver**: Toggle availability, accept rides, earnings, history  
  - **Admin**: Manage users/drivers, view rides, analytics  
- **Authentication & Authorization**:
  - JWT-based login/register  
  - Blocked/suspended users redirected to status page  
  - Persistent login state  
- **Enhancements**:
  - Charts (earnings, analytics) with **recharts**
  - Notifications with **react-hot-toast**
  - SOS/Emergency button during active rides (share live location via SMS/WhatsApp/Email)
  - Skeleton loaders & lazy loading for performance

### Tech Stack
- **React, Redux Toolkit, RTK Query, TypeScript**
- **Tailwind CSS** for styling
- **Optional**: recharts, react-hot-toast, leaflet (maps)

---

## 🔹 Project Requirements

- Separate **Frontend & Backend repos**
- Clean, modular code with **10+ meaningful commits**
- Live deployment links for both frontend & backend
- Demo video (10–15 min) showing:
  - Register/Login (all roles)
  - Rider requests ride → Driver accepts → Status updates
  - Rider/Driver/Admin dashboards
- Provide **test credentials** for all roles

---

Use the following credentials to log in as an admin:

- **Email:** admin@gmail.com
- **Password:** 12345678


## 🔗 Live Links
- **Backend API**: https://ride-booking-system-backend-ten.vercel.app/  

---
