//Install express server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const root = './';
const port = process.env.PORT || '8080';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, 'dist/sudoku-live')));
app.get('*', (req, res) => {
  res.sendFile('dist/sudoku-live/index.html', {root});
});

app.listen(port, () => console.log(`API running on localhost:${port}`));
