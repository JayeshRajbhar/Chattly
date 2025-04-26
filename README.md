# 💬 Chattly - Modern Real-Time Chat Application

![Chattly Header](https://via.placeholder.com/1200x400/2563eb/ffffff?text=Chattly+Real-Time+Messaging)

A sleek, full-featured chat application built with modern web technologies for seamless communication.

[![Live Demo](https://img.shields.io/badge/%F0%9F%94%97-Live_Demo-3b82f6?style=for-the-badge)](https://chattly-asdl.onrender.com)
[![GitHub Stars](https://img.shields.io/github/stars/JayeshRajbhar/Chattly?style=for-the-badge)](https://github.com/JayeshRajbhar/Chattly)

## ✨ Key Features

### 🚀 Core Functionality
- **Real-time messaging** with Socket.IO  
- **JWT authentication** with secure token storage  
- **Profile customization** with Cloudinary image uploads  
- **Theme selection** (light/dark/custom)  
- **Responsive design** for all devices  

### 🛡️ Security & Reliability
- End-to-end encrypted conversations  
- Rate limiting and API protection  
- Persistent message history  
- Online status indicators  

## 🛠 Tech Stack

### Frontend
<p align="left">
  <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=flat-square" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat-square" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Socket.io-010101?logo=socket.io&logoColor=white&style=flat-square" alt="Socket.IO">
</p>

### Backend
<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=flat-square" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=flat-square" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=flat-square" alt="MongoDB">
  <img src="https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white&style=flat-square" alt="JWT">
</p>

## 📦 Project Structure

```
Chattly/
├── frontend/            # Client-side code
│   ├── public/          # Static assets
│   └── src/
│       ├── assets/      # Images, fonts
│       ├── components/  # Reusable UI
│       ├── hooks/       # Custom hooks
│       ├── pages/       # Route components
│       ├── store/       # State management
│       ├── utils/       # Helper functions
│       └── ...          # Config files
│
└── backend/             # Server-side code
    ├── config/          # Configuration
    ├── controllers/     # Route handlers
    ├── middleware/      # Auth, validation
    ├── models/          # Database schemas
    ├── routes/          # API endpoints
    ├── services/        # Business logic
    └── ...              # Server config
```

## 🚀 Quick Start

### Prerequisites
- Node.js ≥18.x  
- MongoDB (local or Atlas)  
- Cloudinary account  

### Installation

1. **Clone the repo**:
   ```bash
   git clone https://github.com/JayeshRajbhar/Chattly.git
   cd Chattly
   ```

2. **Set up environment**:
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   nano .env  # Fill in your credentials
   ```

3. **Install dependencies**:
   ```bash
   npm install --prefix backend
   npm install --prefix frontend
   ```

4. **Run development servers**:
   ```bash
   # In separate terminals:
   npm run dev --prefix backend
   npm run dev --prefix frontend
   ```

5. **Open app**:  
   [http://localhost:5173](http://localhost:5173)

## 📷 Screenshots

| Feature            | Preview |
|--------------------|---------|
| **Login Screen**   | ![Login](https://via.placeholder.com/400x225/3b82f6/ffffff?text=Login+Screen) |
| **Chat Interface** | ![Chat](https://via.placeholder.com/400x225/3b82f6/ffffff?text=Chat+Window) |
| **Profile Settings** | ![Profile](https://via.placeholder.com/400x225/3b82f6/ffffff?text=User+Profile) |

## 🤝 How to Contribute

We welcome contributions! Here's how:

1. Fork the project  
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)  
4. Push to the branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request  

## 📬 Get in Touch

- **Email**: [jayeshrajbhar30@gmail.com](mailto:jayeshrajbhar30@gmail.com)  
- **GitHub**: [JayeshRajbhar](https://github.com/JayeshRajbhar)  
- **LinkedIn**: [jayesh rajbhar](https://www.linkedin.com/in/jayesh-rajbhar-7042a6346)

---

<p align="center">
  Made with ❤️ using cutting-edge web technologies  
  <br>
  <b>Start chatting today!</b>
</p>
