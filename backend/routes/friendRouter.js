// Router config
const { Router } = require("express");
const router = Router();

// Multer config
const multer = require("multer");
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../frontend/public/uploads/");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix =
			Date.now() + "-" + file.originalname.replace(/[^a-zA-Z0-9_]/g, "");
		cb(null, uniqueSuffix + ".png");
	},
});

const upload = multer({ storage: storage });
// const upload = multer({ dest: "uploads/" });

// Zod config
const zod = require("zod");

// JWT config
const jwtKey = require("../config/jwtKey");
const jwt = require("jsonwebtoken");

// Middlewares
// const {} = require("../middlewares/friend");

// Models
const { User, Friend } = require("../db");

// Express config
const express = require("express");
const app = express();
app.use(express.json());

// Cors config

router.post("/create", async (req, res) => {
	const decodedUser = jwt.decode(req.headers.authtoken);
	const user = await User.findOne({ email: decodedUser.email });

	const friendId = req.body.friendId;
	const newFriend = new Friend({
		userId: user._id,
		friendId: friendId,
		mutual: false,
	});
	await newFriend.save();
	res.json({
		message: "Friend successfully created!",
	});
});

router.post("/delete", async (req, res) => {
	const decodedUser = jwt.decode(req.headers.authtoken);
	const user = await User.findOne({ email: decodedUser.email });
	const friendId = req.body.friendId;
	await Friend.findOneAndDelete({ userId: user._id, friendId: friendId });
	res.json({
		message: "Friend deleted!",
	});
});

module.exports = router;
