const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false}));

app.get('/', function(req, res){
    res.render('index');
});

app.post('/', function(req, res){
   const data = req.body;
   const filePath = path.join(__dirname, 'data', 'inputdata.json');
   const fileData = fs.readFileSync(filePath);
   const storedData = JSON.parse(fileData);
   storedData.push(data);
   fs.writeFileSync(filePath, JSON.stringify(storedData));
   res.redirect('/about');
});

app.get('/about', function(req, res){
   const filePath = path.join(__dirname, 'data', 'inputdata.json');
   const fileData = fs.readFileSync(filePath);
   const storedData = JSON.parse(fileData);
   res.render('about', { numberOfView: storedData.length, inputdata: storedData });
});

app.listen(8080);