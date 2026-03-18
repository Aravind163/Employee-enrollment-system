# RS-TECH EMS — MERN Stack

## ⚡ Quick Start (Windows)

### Option A — Double-click to run:
1. Double-click `START-BACKEND.bat`  → opens cmd, installs & starts backend
2. Double-click `START-FRONTEND.bat` → opens cmd, installs & starts frontend
3. Open **http://localhost:5173**

---

### Option B — Manual terminal:

**Terminal 1 — Backend:**
```
cd backend
npm install
npm run dev
```
✅ You should see:
```
✅ MongoDB Connected
🚀 Server running on http://localhost:5000
```

**Terminal 2 — Frontend:**
```
cd frontend
npm install
npm run dev
```
✅ You should see:
```
  ➜  Local:   http://localhost:5173/
```

---

## ❌ Troubleshooting

### Backend crashes (nodemon app crashed)
**Cause:** npm packages not installed  
**Fix:** Make sure you ran `npm install` inside the `backend` folder

### Frontend ModuleLoader / resolveSync error
**Cause:** Node.js v24 incompatibility with older Vite  
**Fix:** This ZIP uses **Vite 6** which supports Node 24. Run:
```
cd frontend
npm install
npm run dev
```
If it still fails, try:
```
cd frontend
npm install --legacy-peer-deps
npm run dev
```

### MongoDB connection error
**Cause:** MongoDB not running  
**Fix (Windows):** Press `Win + R` → type `services.msc` → find MongoDB → Right-click → Start  
**Or:** Run `mongod` in a separate terminal

---

## First Time Use
1. Go to **http://localhost:5173**
2. Click **"Register"** to create admin account
3. Login → You're on the Employee page
4. Click **"Add New Employee"** to add your first employee

---

## Tech Stack
- **Frontend:** React 18 + Vite 6 + React Router 6
- **Backend:** Node.js + Express 4 + Mongoose 8
- **Database:** MongoDB
- **Auth:** JWT + bcryptjs
