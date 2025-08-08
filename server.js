const config = require("./config/config");

// Init the express application
const app = require("./config/express")();

// Start the app by listening on <port>
/*
app.listen(config.port)
*/
app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});

process.on("SIGINT", function () {
  console.log("Gracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit(1);
});

// Expose app
exports = module.exports = app;

// Logging initialization
console.log("Starting server on port 8080");

// ADD /health endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
