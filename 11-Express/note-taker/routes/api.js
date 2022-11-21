const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const {
	readAndAppend,
	readFromFile,
	writeToFile,
} = require('../helpers/fsUtils.js');

router.get('/notes', (req, res) => {
	// Send data from db
	readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/notes', (req, res) => {
	// Create new db entry
	const { title, text } = req.body;
	if (title && text) {
		const newNote = {
			title,
			text,
			id: uuidv4(),
		};
		readAndAppend(newNote, './db/db.json');

		// Send response
		const response = {
			status: 'success',
			body: newNote,
		};
		res.json(response);
	} else {
		// Throw error
		res.json('Error in adding note');
	}
});

router.delete('/notes/:id', (req, res) => {
	// Get data
	const notes = JSON.parse(fs.readFileSync('./db/db.json'));

	// Find the note
	const note = notes.find((note) => note.id === req.params.id);
	if (!note)
		return res
			.status(404)
			.send(`Sorry! There is no course with the id ${req.params.id}`);

	// Remove from db
	const index = notes.indexOf(note);
	notes.splice(index, 1);
	writeToFile('./db/db.json', notes);

	// Send response
	const response = {
		status: 'success',
		body: note,
	};
	res.json(response);
});

module.exports = router;
