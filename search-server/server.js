/* eslint-disable no-console */
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const errorHandler = require("./Middleware/errorHandler");
const credentials = require("./Middleware/credentials");
const corsOptions = require("./Config/corsOptions");
const userRouter = require("./Routes/userRoute");
const authRouter = require("./Routes/authRoute");
const searchRouter = require("./Routes/searchRoute");

require("dotenv").config();

const app = express();

// Allow credentials for origin
app.use(credentials);

// Cross origin allow origins
app.use(cors(corsOptions));

// built-in middleware for url encoded data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// built-in middleware cookie parser
app.use(cookieParser());

// Mounting Routers
app.use("/api/", userRouter);
app.use("/api/", authRouter);
app.use("/api/", searchRouter);

// custom middleware for handling invalid api paths
app.all("*", (req, res, next) => {
  next(
    new errorHandler(`Can't find ${req.originalUrl} that was requested`, 404)
  );
});

// DB Connection
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"));

// Setting up port
const port = process.env.PORT; // Assign Port
app.listen(port, () => {
  console.log(`App Running On Port: ${port} ...`);
});
