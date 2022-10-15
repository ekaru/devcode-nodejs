const express = require('express');
// const mysql = require('mysql');

const app = express();
require('dotenv').config()

const PORT = 3030;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to API TODO." });
  });
  
require("./routes/activity.routes.js")(app);
require("./routes/todo.routes.js")(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });