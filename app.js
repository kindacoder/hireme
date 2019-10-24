const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();



//connect to mongoose
mongoose.connect("mongodb://hireme1:hireme1@ds339348.mlab.com:39348/hireme")
    .then(() => console.log('Database conncted'))
    .catch(err => console.log(err));

//load models
require("./models/Job");
//middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//serving static files : Middlewares
app.use(express.static(__dirname + "/public"));
// set the view engine to ejs
app.set('view engine', 'ejs');




//routes
var userRoutes = require("./routes/user");
var hrRoutes = require("./routes/hr");

app.get('/', (req, res) => {
    res.render('index');
})



//use routes
app.use("/users", userRoutes);
app.use("/hr", hrRoutes);


//listen to the server
app.listen(5000, () => {
    console.log(`Server started on port 5000`);
});