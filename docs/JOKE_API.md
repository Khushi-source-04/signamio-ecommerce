# Joke Generator API Documentation

## 🎭 Endpoints

### 1. Get Random Joke
**Endpoint:** `GET /api/jokes/random`

**Description:** Fetches a random joke from external API

**Query Parameters:**
- `source` (optional): 'official' (default) or 'type'

**Response:**
```json
{
  "success": true,
  "data": {
    "joke": "Why did the programmer quit his job? Because he didn't get arrays.",
    "source": "Official Joke API"
  }
}
```

### 2. Get Joke Categories
**Endpoint:** `GET /api/jokes/categories`

**Description:** Get all available joke categories

**Response:**
```json
{
  "success": true,
  "data": ["general", "knock-knock", "programming", "knock-knock"]
}
```

### 3. Get Jokes by Type
**Endpoint:** `GET /api/jokes/:type`

**Parameters:**
- `:type` - Joke category (e.g., 'programming', 'knock-knock')
- `count` (query param) - Number of jokes (default: 1)

**Example:** `GET /api/jokes/programming?count=5`

**Response:**
```json
{
  "success": true,
  "data": {
    "jokes": ["joke1", "joke2", "joke3"],
    "count": 3,
    "type": "programming"
  }
}
```

---

## 🔄 External API Used

**Official Joke API:** https://official-joke-api.appspot.com

### Supported Categories:
- `general`
- `programming`
- `knock-knock`
- `script`

---

## 💻 Frontend Usage

### Component Import:
```jsx
import JokeGenerator from '@/components/JokeGenerator';

export default function App() {
  return <JokeGenerator />;
}
```

### Direct Fetch Example:
```javascript
const fetchJoke = async () => {
  const response = await fetch('http://localhost:5000/api/jokes/random');
  const data = await response.json();
  console.log(data.data.joke);
};
```

---

## 🎯 Features

✅ Random joke generation
✅ Category-based jokes
✅ Copy to clipboard
✅ Share functionality
✅ Error handling
✅ Loading states
✅ Beautiful UI with Tailwind CSS
✅ Mobile responsive

---

## 🚀 Setup Instructions

1. **Backend running:**
```bash
cd backend
npm install axios
npm run dev
```

2. **Frontend access:**
Visit `http://localhost:3000/joke`

3. **API Test (Postman):**
```
GET http://localhost:5000/api/jokes/random
GET http://localhost:5000/api/jokes/programming
GET http://localhost:5000/api/jokes/categories
```

---

**Last Updated:** June 2026
