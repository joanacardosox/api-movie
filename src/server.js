require("express-async-errors");

const AppError = require("./utils/AppError");

const express = require("express");
const routes = require("./routers");

const app = express();
app.use(express.json());

app.use(routes);

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = 3006;
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
