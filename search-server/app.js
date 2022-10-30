const express = require("express");

const errorHandler = require("./Helper/errorHandler");
const router = require("./router");

const app = express();

// const whitelist = ["http://localhost:3000"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// // Then pass them to cors:
// app.use(cors(corsOptions));

// Mounting Routers
app.use("/api", router);

app.all("*", (req, res, next) => {
  next(
    new errorHandler(`Can't find ${req.originalUrl} that was requested`, 404)
  );
});

module.exports = app;
