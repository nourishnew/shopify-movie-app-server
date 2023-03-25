const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const PW = process.env.PW;

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: "500mb" }));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("shopify movies server connected");
});
mongoose
  .connect(
    `mongodb+srv://nourish:${PW}@cluster0.cnbun.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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
