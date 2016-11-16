const express = require('express');
const app = express();
const request = require('request');
const morgan = require ('morgan');

app.use(morgan('dev'));


app.get('/api/hot', (req, res) => {
  console.log('getting hot');
  request('https://www.reddit.com/hot.json', (err, response, body) => {
    if (!err && response.statusCode == 200) {
      console.log(body);
      res.send(body);
    } else {
      res.send(404);
    }
  });
});

app.use(express.static('./'));
app.use(express.static('dist'));

app.get('*', (req, res) => {
  console.log('getting stuff');
  res.sendFile(`${__dirname}/dist/index.html`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app listening on', port);
});
