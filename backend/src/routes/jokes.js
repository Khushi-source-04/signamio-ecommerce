const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get random joke
router.get('/random', async (req, res) => {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    const joke = `${response.data.setup} ${response.data.punchline}`;

    res.status(200).json({
      success: true,
      data: { joke, source: 'Official Joke API' }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch joke',
      error: error.message
    });
  }
});

// Get joke categories
router.get('/categories', async (req, res) => {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/jokes/categories');
    res.status(200).json({ 
      success: true, 
      data: response.data 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch categories' 
    });
  }
});

// Get jokes by type
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { count = 1 } = req.query;
    const url = count > 1 
      ? `https://official-joke-api.appspot.com/jokes/${type}/random?count=${count}`
      : `https://official-joke-api.appspot.com/jokes/${type}/random`;

    const response = await axios.get(url);
    const jokes = Array.isArray(response.data) 
      ? response.data.map(j => `${j.setup} ${j.punchline}`)
      : [`${response.data.setup} ${response.data.punchline}`];

    res.status(200).json({ 
      success: true, 
      data: { jokes, count: jokes.length, type } 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: `Failed to fetch ${req.params.type} jokes` 
    });
  }
});

module.exports = router;
