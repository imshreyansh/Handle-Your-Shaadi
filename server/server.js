const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const morgan = require("morgan");
const { mountRoutes } = require("./routes")


app.use(morgan("dev"));
app.use(function (req, res, next) {
    let origin = req.headers.origin;
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(cors())
// Use above cors before routes are setup
mountRoutes(app)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"))


mongoose.connect('mongodb://localhost/handleyourshaadi',
    { useNewUrlParser: true },{ useFindAndModify: false }
).then(() =>
    console.log('connected to mongodb'))
    .catch((err) =>
        console.error('could not connect to mongodb', err))

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('listening on port ', port)
})
