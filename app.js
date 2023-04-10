require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const mainRouter = require("./routes/main");
const notFoundMiddleware = require("./middleware/route-not-found_Mdw");
const errorHandlerMiddleware = require("./middleware/Error-handler_Mdw");

// In Built-middleware
app.use(express.static("./public"));
app.use(express.json());

// Routing
app.use("/api/v1", mainRouter);

// Custom middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
