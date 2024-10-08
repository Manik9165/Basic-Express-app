const express = require('express');
const path = require('path');
const file = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    file.readdir('./files', (err, files) => {
        if (err) throw err;
        res.render('index', { files: files.sort() });
    })
})

app.get('/note/:fileName', (req, res) => {
    file.readFile(`./files/${req.params.fileName}`, 'utf8', (err, data) => {
        if (err) throw err;
        res.render('note', { note: data, fileName: req.params.fileName });
    })
})

app.post('/create', (req, res) => {
    file.writeFile(`${__dirname}/files/${req.body.note.split(' ').join('')}.txt`, req.body.description, (err) => {
        res.redirect('/');
    });
})

app.listen(3000, () => {
    console.log('Server started at port 3000');
})