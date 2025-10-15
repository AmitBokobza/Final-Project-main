const express = require("express");
const connectToDB = require("./DB/dbService");
const router = require("./Router/router");
const corsmiddleware = require("./middleware/cors");
const loggerService = require("./logger/loggerService");
const app = express();

const PORT = 8181;

app.use(express.json());
app.use(corsmiddleware);
app.use(loggerService())
app.use(router);


app.listen(PORT, () => {
    console.log("Server is listening");
    connectToDB();
})