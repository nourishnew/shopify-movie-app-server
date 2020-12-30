const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 5000;

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "500mb" }));

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(cors());

mongoose
	.connect(process.env.CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, function () {
			console.log("Listening on port " + PORT);
		});
	})
	.catch((err) => {
		console.log(err.message);
	});
app.use("/app", require("./routes/server"));

mongoose.set("useFindAndModify", false);
