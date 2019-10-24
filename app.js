const express = require('express');
const app = express();
const port = 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');
//serving static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

//listen to the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});