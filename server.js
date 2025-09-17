require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

// CORS 
app.use(cors());

// Static (serve the upload form)
app.use(express.static('public'));

// Multer config: memory storage is fine (we only read metadata)
const upload = multer({ storage: multer.memoryStorage() });

// Root page with the form
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/public/index.html');
});

// endpoint: POST /api/fileanalyse with field name "upfile"
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    // DX
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Respond EXACTLY with: name, type, size (bytes)
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

app.listen(port, () => {
  console.log('Server listening on ' + port);
});

