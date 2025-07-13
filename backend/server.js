const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const recipeRoutes = require('./routes/recipes');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    return res.json({hello: "world"});
});

app.use("/api/recipes", recipeRoutes);

app.listen(process.env.PORT, () => {
    console.log("app is running on localhost:" + process.env.PORT);
})