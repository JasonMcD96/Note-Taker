var express = require("express");
var path = require("path");
const fs = require("fs")

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get("/api/notes", function(req, res){
    console.log('User wants to load notes...')
    let raw = fs.readFileSync('./db/db.json')
    let notes = JSON.parse(raw)
    res.send(notes)
})

// Server initialization
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
