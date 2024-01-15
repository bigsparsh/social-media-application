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

// Zod config
const zod = require("zod");

// JWT config
const jwtKey = require("../config/jwtKey");
const jwt = require("jsonwebtoken");

// Middlewares
const { feedBodyCheck } = require("../middlewares/feed");

// Models
const { User, Feed } = require("../db");

// Express config
const express = require("express");
const app = express();

// Cors config
const cors = require("cors");
const corsOptions = {
	origin: "https://social-media-1sol.onrender.com",
	// origin: "http://localhost:5173",
	methods: "GET,PUT,POST,DELETE",
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

router.post(
	"/create",
	upload.single("image"),
	feedBodyCheck,
	async (req, res) => {
		const user = jwt.decode(req.headers.authtoken);
		const currentUser = await User.findOne({ email: user.email });
		const newFeed = new Feed({
			user: currentUser._id,
			title: req.body.title,
			desc: req.body.desc,
			image: req.file.filename,
			timestamp: new Date(),
		});
		await newFeed.save();
		res.json({
			message: "=| Post sucessfully created |=",
		});
	}
);

router.post("/getall", async (req, res) => {
	const decode = jwt.decode(req.headers.authtoken);
	const user = await User.findOne({ email: decode.email });
	const feed = await Feed.find({ user: { $ne: user._id } });
	const post = await Feed.find({ user: user._id });
	for (const ele of feed) {
		ele.user = await User.findById(ele.user);
	}
	for (const ele of post) {
		ele.user = await User.findById(ele.user);
	}
	res.json({
		feed: feed,
		post: post,
	});
});

router.post("/profile", async (req, res) => {
	const userId = req.body.userId;
	const post = await Feed.find({ user: userId });
	res.json({
		post: post,
	});
});

module.exports = router;
