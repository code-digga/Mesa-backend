const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { initDb } = require("./config/db_config");
const globalErrorHandler = require("./middlewares/global_middlewares/error_handler");
const authRouter = require("./routes/auth_route");
const courseRouter = require("./routes/courses_route");
const resultsRouter = require("./routes/results_route");
const examsRouter = require("./routes/exams_route");
const lessonsRouter = require("./routes/lesson_route");

const app = express();
const PORT = 3001;
const BASE_ROUTE = "/api/v1/";
initDb();

app.use(helmet());
app.use(bodyParser.json());
app.use(BASE_ROUTE + "auth", authRouter);
app.use(BASE_ROUTE + "courses", courseRouter);
app.use(BASE_ROUTE + "results", resultsRouter);
app.use(BASE_ROUTE + "exams", examsRouter);
app.use(BASE_ROUTE + "lessons", lessonsRouter);

app.use(globalErrorHandler);
app.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT}`);
});
