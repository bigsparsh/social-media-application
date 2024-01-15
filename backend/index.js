// Express config
const express = require("express");
const app = express();
const port = 3000;

// Routers
const userRouter = require("./routes/userRouter");
const feedRouter = require("./routes/feedRouter");
const friendRouter = require("./routes/friendRouter");

// Cors config
const cors = require("cors");
app.use(cors());

// Body parse middleware
app.use(express.json());

// All the initial routes
app.use("/user", userRouter);
app.use("/feed", feedRouter);
app.use("/friend", friendRouter);

// Listening to the server
app.listen(port);
