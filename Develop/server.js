var express = require("express");
var path = require("path");
const fs = require("fs")
const DBPATH = './db/db.json'

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get("/api/notes", function(req, res){
    let raw = fs.readFileSync(DBPATH)
    let notes = JSON.parse(raw)
    res.send(notes)
})

app.post("/api/notes", function(req, res){
    let notes = JSON.parse(fs.readFileSync(DBPATH))
    formattedNote = req.body
    formattedNote.id = Math.floor(Math.random() * 1000000)
    notes.push(formattedNote)
    fs.writeFileSync(DBPATH, JSON.stringify(notes))
    res.send(notes)
})

app.delete("/api/notes/:id", function(req, res){
    let noteToDelete = req.params.id
    console.log('Note being deleted:', noteToDelete)
    let notes = JSON.parse(fs.readFileSync(DBPATH))
    let newNotes = notes.filter(note => note.id != noteToDelete)
    fs.writeFileSync(DBPATH, JSON.stringify(newNotes))
    res.send(newNotes)
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


// Server initialization
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
