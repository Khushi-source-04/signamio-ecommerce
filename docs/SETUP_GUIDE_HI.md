# SIGNAMIO ई-कॉमर्स - सेटअप गाइड

## 🚀 शुरुआत करने के लिए

### 1. Backend Setup

```bash
# Backend directory में जाएं
cd backend

# Dependencies install करें
npm install

# .env file create करें
cp ../.env.example .env

# अपनी database और API keys fill करें
# .env file edit करें
```

### 2. Database Setup

```bash
# MongoDB local या Atlas से connect करें
# .env में DATABASE_URL set करें

# Sample data add करने के लिए
node seed-data.js
```

### 3. Backend Start करें

```bash
npm run dev
# Server localhost:5000 पर चलेगा
```

### 4. Frontend Setup

```bash
# Frontend directory में जाएं
cd frontend

# Dependencies install करें
npm install

# Environment variables setup करें
cp .env.local.example .env.local
```

### 5. Frontend Start करें

```bash
npm run dev
# Frontend localhost:3000 पर खुलेगा
```

---

## 🔑 Environment Variables

### Backend (.env)
```
DATABASE_URL=mongodb://localhost:27017/signamio
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key
```

---

## 📊 Product Data Import करना

### Excel/CSV से products add करें:

```javascript
// आपके CSV/Excel को JSON में convert करें
// फिर seed-data.js को update करें

const products = [
  {
    name: 'Product Name',
    sku: 'SKU123',
    price: { mrp: 1000, sellingPrice: 800 },
    // ... अन्य details
  }
];

// फिर चलाएं:
node seed-data.js
```

---

## 🧪 API Testing

### Postman में test करें:

1. **Register करें:**
   - POST: `http://localhost:5000/api/auth/register`
   - Body:
   ```json
   {
     "name": "John",
     "email": "john@example.com",
     "password": "password123",
     "phone": "9876543210"
   }
   ```

2. **Login करें:**
   - POST: `http://localhost:5000/api/auth/login`
   - Body:
   ```json
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **Products देखें:**
   - GET: `http://localhost:5000/api/products`
   - Filters: `?category=home-decor&sort=latest&limit=20`

---

## 🐛 Common Issues

### Port पहले से busy है
```bash
# Linux/Mac में port kill करें
lsof -ti:5000 | xargs kill -9

# Windows में
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB connection error
- MongoDB server चल रहा है check करें
- DATABASE_URL सही है check करें
- Connection string format: `mongodb://localhost:27017/signamio`

### CORS error
- .env में CORS_ORIGIN check करें
- Frontend URL सही है check करें

---

## 📱 Deployment

### Frontend (Vercel पर)
```bash
cd frontend
npm install -g vercel
vercel
```

### Backend (Heroku/Railway पर)
```bash
cd backend
# Procfile create करें
echo "web: npm start" > Procfile

# Deploy करें (Heroku example)
heroku create signamio-backend
git push heroku main
```

---

**More Help:** GitHub Issues में सवाल पूछें! 🙂
