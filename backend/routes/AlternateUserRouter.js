import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase with your configuration
const firebaseConfig = require("../config/firebaseConfig");

const fireapp = initializeApp(firebaseConfig);

// Get the storage instance
const firestorage = getStorage(fireapp);

// Router config
const { Router } = require("express");
const router = Router();

// Multer config
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Zod config
const zod = require("zod");

// JWT config
const jwtKey = require("../config/jwtKey");
const jwt = require("jsonwebtoken");

// Middlewares
const {
	userSignUpBodyCheckMiddleware,
	userDuplicateCheck,
	userTokenAuth,
	userTokenCheck,
	userLogInBodyCheckMiddleware,
	userExistCheck,
} = require("../middlewares/user");

// Session Config
const session = require("express-session");

// Models
const { User, Friend } = require("../db");

// Express config
const express = require("express");
const app = express();
app.use(express.json());

// Cors config

// Sign Up router
router.post(
	"/signup",
	upload.single("profilePath"),
	userSignUpBodyCheckMiddleware,
	userDuplicateCheck,
	async (req, res) => {
		const user = req.body;
		const file = req.file;
		const newFilePath = `uploads/${new Date()}_${Math.round(
			Math.random() * 10000
		)}_${file.originalname}`;
		const storageRef = getStorage().ref();
		const imageRef = storageRef.child(newFilePath);

		await imageRef.put(file.buffer);

		const newUser = new User({
			email: user.email,
			password: user.password,
			username: user.username,
			profilePath: newFilePath,
		});
		await newUser.save();

		const authToken = jwt.sign({ email: user.email }, jwtKey);

		res.json({
			message: "=| User created successfully |=",
			authToken: authToken,
		});
	}
);

// Log In router
router.post(
	"/login",
	userLogInBodyCheckMiddleware,
	userExistCheck,
	(req, res) => {
		const user = req.body;
		const authToken = jwt.sign({ email: user.email }, jwtKey);
		res.json({
			message: "=| Logged in successfully |=",
			authToken: authToken,
		});
	}
);
router.post("/tokenlogin", userTokenCheck, userTokenAuth, (req, res) => {
	res.json({
		message: "=| Logged in successfully |=",
	});
});

router.post("/getallfriend", async (req, res) => {
	const decode = jwt.decode(req.headers.authtoken);
	const user = await User.findOne({ email: decode.email });
	const allFriends = await Friend.find({ userId: user._id });
	const friends = allFriends.map((ele) => ele.friendId);
	res.json({
		nonFriend: await User.find({ _id: { $nin: friends, $ne: user._id } }),
		friend: await User.find({ _id: { $in: friends } }),
	});
});

router.post("/profile", async (req, res) => {
	const userId = req.body.userId;
	res.json({
		user: await User.findById(userId),
	});
});

module.exports = router;
