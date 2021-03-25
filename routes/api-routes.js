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
            const note = req.body;
            notes.push(note);
            updateNote();
        });

        app.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });

        app.delete("/api/notes/:id", function(req,res) {
            notes.splice(req.params.id, 1);
            updateNote();
        });

        function updateNote() {
            fs.writeFileSync('./db/db.json', JSON.stringify(data), function(err) {
                if(err) throw(err);
            });
            res.json(data);
        };
    });
};