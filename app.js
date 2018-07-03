const express = require('express')
const path = require('path');
const axios = require('axios');
const apiKey = require('./amadeusApiKey');

const app = express()

const port = process.env.PORT || 3000;

const rootUrl = "https://api.sandbox.amadeus.com/v1.2";

// const apiRouter = require("./apiRouter")
// app.use("/api", apiRouter)

// // routes file

// const apiKey = "asdfr4"
// const apiUrl = "https://someFlightSearchApi.com/api"
// apiRouter.post('/suggestions', (req, res) => {
//   http.get(apiUrl + "suggestions" + req.parms)
//   res.send()
// });
let fChunk = ".-K/..Q/.s-/0.U.-..C-u-h.D.-n/-3./.-A."; 
let sChunk = ".l./-E./.P.-//Y..P-..g.F-b/-s..-7.4y-..";
let tChunk = "-/.Z-F/-V.-..V-8-./0...-5-t-../";
const smth = fChunk.concat(sChunk).concat(tChunk);
const smthElse = smth.replace(/[./-]/g, "");

app.get('/city', (req, res) => {
  axios.get(`${rootUrl}/airports/autocomplete?apikey=${smthElse}&term=${req.query.city}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error.message);
    });
})


app.get('/search', (req, res) => {
  const origin = req.query.from;
  const destination = req.query.to;
  const date = req.query.date;
  const dateDay = date.slice(-2);
  const nextDate = date.replace(dateDay, "0"+(+dateDay+1));

  axios.get(`${rootUrl}/flights/extensive-search?apikey=${smthElse}&origin=${origin}&destination=${destination}&departure_date=${date}--${nextDate}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error.message);
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`Hanging on port ${port}`));