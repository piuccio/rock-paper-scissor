const express = require('express');
const path = require('path');
const transpile = require('./transpile');

const app = express();

app.use(transpile('../client'));
app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Example ready on http://localhost:' + PORT);
});
