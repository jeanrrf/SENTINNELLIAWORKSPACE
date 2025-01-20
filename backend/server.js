const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all routes
app.use(cors());

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/projects', (req, res) => {
    res.json({
        data: [
            { id: 1, name: "Project 1", description: "Description 1" },
            { id: 2, name: "Project 2", description: "Description 2" },
        ],
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
