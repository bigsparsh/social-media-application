const mongoose = require("mongoose");
mongoose.connect(
	"mongodb+srv://bigsparsh:NwWoiXldO0xO31uS@cluster0.maoq3bv.mongodb.net/social-media-application"
);

const userSchema = mongoose.Schema({
	email: String,
	password: String,
	username: String,
	profilePath: String,
});

const feedSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	title: String,
	desc: String,
	image: String,
	timestamp: Date,
});
const friendSchema = mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	mutual: Boolean,
});

const User = mongoose.model("User", userSchema);
const Feed = mongoose.model("Feed", feedSchema);
const Friend = mongoose.model("Friend", friendSchema);

module.exports = { User, Feed, Friend };
