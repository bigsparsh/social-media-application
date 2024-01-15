// JWT config
const jwtKey = require("../config/jwtKey");
const jwt = require("jsonwebtoken");

// Zod config
const zod = require("zod");

// Express config
const express = require("express");
const app = express();

// Database setup and config
const mongoose = require("mongoose");
const { User } = require("../db");

// Cors config
const cors = require("cors");
app.use(cors());

const userSignUpBodyCheckMiddleware = (req, res, next) => {
	const userSchema = zod.object({
		username: zod.string(),
		email: zod.string().email(),
		password: zod.string(),
		profilePath: zod.unknown(),
	});
	const bodyCheck = userSchema.safeParse(req.body);
	if (bodyCheck.success == false) {
		res.status(400).json({
			error: "Email is in invalid format",
			solution: "Kindly, try again with appropriate email address",
		});
		return;
	}
	next();
};

const userLogInBodyCheckMiddleware = (req, res, next) => {
	const userSchema = zod.object({
		email: zod.string().email(),
		password: zod.string(),
	});
	const bodyCheck = userSchema.safeParse(req.body);
	if (bodyCheck.success == false) {
		res.status(400).json({
			error: "Email is in invalid format",
			solution: "Kindly, try again with appropriate email address",
		});
		return;
	}
	next();
};

const userDuplicateCheck = async (req, res, next) => {
	if (await User.findOne({ email: req.body.email })) {
		res.status(403).json({
			error: "Email already exists",
			solution: "Try logging in instead of Sign Up",
		});
		return;
	}
	next();
};

const userExistCheck = async (req, res, next) => {
	const user = req.body;
	if (await User.findOne({ email: user.email, password: user.password })) {
		next();
		return;
	}
	res.status(403).json({
		error: "Email doesn't exist",
		solution: "Try signing up instead of Log In",
	});
	return;
};

const userTokenCheck = (req, res, next) => {
	const authToken = req.headers.authtoken;
	if (authToken) {
		try {
			jwt.verify(authToken, jwtKey);
		} catch (err) {
			res.status(400).json({
				error: "Incorrect token",
				solution: "Send the appropriate token",
			});
			return;
		}
	} else {
		res.status(400).json({
			error: "Missing token",
			solution: "Send the appropriate authentication token",
		});
		return;
	}
	next();
};

const userTokenAuth = async (req, res, next) => {
	const authToken = req.headers.authtoken;
	const user = jwt.decode(authToken);
	req.user = user;
	if (await User.findOne({ email: user.email })) {
		next();
		return;
	}
	res.status(403).json({
		error: "Incorrect credentials",
		solution: "Provide the correct information",
	});
	return;
};

module.exports = {
	userSignUpBodyCheckMiddleware,
	userDuplicateCheck,
	userTokenCheck,
	userTokenAuth,
	userLogInBodyCheckMiddleware,
	userExistCheck,
};
