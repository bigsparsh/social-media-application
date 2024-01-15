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

const feedBodyCheck = (req, res, next) => {
	const userSchema = zod.object({
		title: zod.string(),
		desc: zod.string(),
		image: zod.unknown(),
	});
	const bodyCheck = userSchema.safeParse(req.body);
	if (bodyCheck.success == false) {
		res.status(400).json({
			error: "Feed request in invalid",
			solution: "Kindly, try again with appropriate request",
		});
		return;
	}
	next();
};

module.exports = { feedBodyCheck };
