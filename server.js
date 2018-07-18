const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.get('/', (req, res) => {
    res.send({title: 'Welcome to my app'});
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server started')
});