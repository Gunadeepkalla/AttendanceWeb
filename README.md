# 🚀 Intern Attendance Management System

A backend system to manage intern registrations, approvals, and daily attendance tracking within a department.

---

## 📌 Features

### 👤 Authentication
- Intern Registration
- Secure Login using JWT
- Password hashing with bcrypt

### 🛠️ Admin Panel
- View all interns
- Approve / Reject intern registrations
- Role-based access control (Admin only)

### 🕒 Attendance System
- Daily Check-in
- Daily Check-out
- Automatic working hours calculation
- Prevent duplicate attendance entries

### 🔐 Security
- JWT-based authentication
- Protected routes
- Role-based authorization

---

## 🧠 Workflow

```plaintext
Register → Pending Approval → Admin Approval → Login → Attendance