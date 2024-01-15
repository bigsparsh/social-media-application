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
const corsOptions = {
	// origin: "http://localhost:5173",
	origin: "https://social-media-1sol.onrender.com",
	methods: "GET,PUT,POST,DELETE",
	optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));

// Body parse middleware
app.use(express.json());

// All the initial routes
app.use("/user", userRouter);
app.use("/feed", feedRouter);
app.use("/friend", friendRouter);

// Listening to the server
app.listen(port);
