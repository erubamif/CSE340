import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const NODE_ENV = 'production';
const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
  * Configure Express middleware
  */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


/**
  * Routes
  */
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/home.html'));
});

app.get('/organizations', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/organizations.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/projects.html'));
});