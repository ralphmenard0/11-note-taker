const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/api.js');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route to api.js
app.use('/api', api);

// Send notes.html
app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Wildcard route
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () =>
	console.log(`App listening at http://localhost:${PORT} 🚀`)
);
