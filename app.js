const express = require('express')
const path = require('path');

const app = express()

const port = process.env.PORT || 3000;

const mockData = [{
    "id": 1,
    "from": "Lviv",
    "to": "Kiev",
    "date": "11/20/2017",
    "cost": "$0.92",
    "company": "Jaxspan"
  }, {
    "id": 2,
    "from": "Lviv",
    "to": "Odessa",
    "date": "1/11/2018",
    "cost": "$7.42",
    "company": "Blogpad"
  }, {
    "id": 3,
    "from": "Hulutao",
    "to": "Cuozheqiangma",
    "date": "7/19/2017",
    "cost": "$9.95",
    "company": "Zoombox"
  }, {
    "id": 4,
    "from": "Panshi",
    "to": "Picoto",
    "date": "8/30/2017",
    "cost": "$1.60",
    "company": "DabZ"
  }, {
    "id": 5,
    "from": "Chak",
    "to": "Köln",
    "date": "1/5/2018",
    "cost": "$9.15",
    "company": "Quimba"
  }, {
    "id": 6,
    "from": "Lviv",
    "to": "Kiev",
    "date": "10/29/2017",
    "cost": "$6.15",
    "company": "Rhynyx"
  }, {
    "id": 7,
    "from": "Cayenne",
    "to": "Mahdalynivka",
    "date": "2/26/2018",
    "cost": "$9.03",
    "company": "Feedbug"
  }, {
    "id": 8,
    "from": "Chixi",
    "to": "Guanghou",
    "date": "1/18/2018",
    "cost": "$5.69",
    "company": "Skyvu"
  }, {
    "id": 9,
    "from": "Fort Wayne",
    "to": "Monte Azul Paulista",
    "date": "10/18/2017",
    "cost": "$5.40",
    "company": "Mydo"
  }, {
    "id": 10,
    "from": "El Cafetal",
    "to": "Guanambi",
    "date": "8/20/2017",
    "cost": "$6.73",
    "company": "Gabvine"
  }];

app.get('/search', (req, res) => {
    var parsedResponse = mockData.filter((obj) => obj.from.toLowerCase() === req.query.from.toLowerCase() && obj.to.toLowerCase() === req.query.to.toLowerCase());
    res.send(parsedResponse);
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`Starting the server at port ${port}`));