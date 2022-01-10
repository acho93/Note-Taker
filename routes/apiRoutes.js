const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(data);
});

router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();

    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    data.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(data));

    res.json(data);
});

router.delete('/notes/:id', (req, res) => {
    let noteId = req.params.id;

    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    const newData = data.filter( note => {
        if (note && note.id) {
            return note.id.toString() !== noteId
        } return false
    })
        
    fs.writeFileSync('./db/db.json', JSON.stringify(newData));
    
    res.json(newData);
});

module.exports = router;