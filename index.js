const express = require("express");

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "You have reached our server",
  });
});
app.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT}`);
});
