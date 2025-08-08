const config = require("./config/config");
const metrics = require("./metrics/prometheus");

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

//Prometeus metric
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", metrics.register.contentType);
    res.end(await metrics.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});
