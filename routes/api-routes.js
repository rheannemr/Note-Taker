const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs.readFile("db/db.json","utf8", (err, data) => {
        
        if (err) throw err;
        var notes = JSON.parse(data);

        app.get("/api/notes", function(req, res) {
            res.json(notes);
        }); 

        app.post("/api/notes", function (req, res) {
            const note = {
                title: req.body.title,
                text: req.body.text,
                id: req.body.id
            };
            req.body.id = note.length;
            notes.push(note);
            updateNote(notes);
            res.json(notes);
        });

        app.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });

        app.delete("/api/notes/:id", function(req,res) {
            notes.splice(req.params.id, 1);
            updateNote(notes);
            res.json(notes);
        });

        function updateNote(notes) {
            fs.writeFile('./db/db.json', JSON.stringify(notes), function(err) {
                if(err) throw(err);
                return true;
            });
        };
    });
};