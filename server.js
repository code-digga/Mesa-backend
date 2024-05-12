const express = require("express");
const { initDb } = require("./config/db.config");
const globalErrorHandler = require("./middlewares/global_middlewares/error_handler");
const authRouter = require("./routes/auth_router");

const app = express();
const PORT = 3001;
const BASE_ROUTE = "/api/v1/";
initDb();

app.use(BASE_ROUTE + "auth", authRouter);

app.use(globalErrorHandler);
app.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT}`);
});
