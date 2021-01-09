var express = require("express");
var path = require("path");
const fs = require("fs")
const DBPATH = './db/db.json'

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

//add get * returns index.html


app.get("/api/notes", function(req, res){
    let raw = fs.readFileSync(DBPATH)
    let notes = JSON.parse(raw)
    res.send(notes)
})

app.post("/api/notes", function(req, res){
    // console.log(req.body)
    let notes = JSON.parse(fs.readFileSync(DBPATH))
    notes.push(req.body)
    console.log(notes)
    fs.writeFileSync(DBPATH, JSON.stringify(notes))
    res.send(notes)
})

// Server initialization
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
