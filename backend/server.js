const app = require("./index");
const connectDatabase = require("./config/database");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the engine due to uncaught exception");
  process.exit(1);
});
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "config/config.env" });
}
//Connecting to DB
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the engine due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
