const express = require('express');
const app = express();
const port = 5000;

//serving static files
app.use(express.static(__dirname + "/public"));
// set the view engine to ejs
app.set('view engine', 'ejs');

//routes
var userRoutes = require("./routes/user");



app.get('/', (req, res) => {
    res.render('index');
})


//use routes
app.use("/users", userRoutes);

//listen to the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});