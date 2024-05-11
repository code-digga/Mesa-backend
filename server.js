const express = require("express");
const { initDb } = require("./config/db.config");
const globalErrorHandler = require("./middlewares/global_middlewares/error_handler");

const app = express();
const PORT = 3001;

initDb();

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "You have reached our server",
  });
});

app.use(globalErrorHandler);
app.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT}`);
});
