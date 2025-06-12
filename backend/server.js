const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
const path = require('path');
app.use(cors());

app.use(express.json());
app.get('/api/posts', (req, res) => {
  res.json([{ id: 1, title: "Test Post" }]);
});

app.get('/', (req, res) => {
  res.send('Backend is working! hii');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


