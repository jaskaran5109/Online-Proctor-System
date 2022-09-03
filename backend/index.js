const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const errorMiddleware = require("./middleware/error");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/config.env" });
}
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const user = require("./routes/userRoutes");
const question = require("./routes/questionRoutes");
const student = require("./routes/studentRoutes");
const solution = require("./routes/solutionRoutes");
const test = require("./routes/testRoutes");

app.use("/api/v1", user);
app.use("/api/v1", question);
app.use("/api/v1", student);
app.use("/api/v1", solution);
app.use("/api/v1", test);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
app.use(errorMiddleware);
module.exports = app;
