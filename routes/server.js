const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");

//create user
router.post("/user/signup", async (req, res) => {
	const { name, id } = req.body;
	try {
		const user = new User({
			name: name,
			id: id,
			nominationIds: [],
		});
		await user.save();
		res.status(200).send(id);
	} catch (error) {
		res.status(500).send("error");
	}
});
//login user
router.post("/user/login", async (req, res) => {
	const { name } = req.body;
	try {
		const doc = await User.findOne({ name: name }).exec();
		res.status(200).send(doc);
	} catch (error) {
		res.status(500).send("error");
	}
});

// get nominations
router.get("/nomination/:userId", async (req, res) => {
	const { userId } = req.params;
	try {
		const doc = await User.findOne({ id: userId }).exec();
		return res.status(200).send(doc);
	} catch (err) {
		res.status(500).send("error");
	}
});
//add nomination
router.post("/nomination", async (req, res) => {
	const { userId, movieId } = req.body;

	try {
		await User.updateOne(
			{ id: userId },
			{ $push: { nominationsIds: movieId } }
		).exec();

		res.status(200).send("nomination added");
	} catch (error) {
		res.status(500).send(error);
	}
});
//delete nomination
router.delete("/nomination/:movieId", async (req, res) => {
	const { userId } = req.body;
	const { movieId } = req.params;

	try {
		await User.updateOne(
			{ id: userId },
			{ $pull: { nominationsIds: movieId } }
		).exec();
		res.status(200).send("nomination deleted");
	} catch (error) {
		res.status(500).send("error");
	}
});

module.exports = router;
