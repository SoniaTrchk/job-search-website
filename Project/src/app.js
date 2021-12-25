const express = require('express');
cookieParser = require('cookie-parser');
const con = require("./config/db");

const port = 3000;
const app = express();

const employeeRouter = require("./routes/employeeRouter");
const employerRouter = require("./routes/employerRouter");
const authRouter = require("./routes/authRouter");

app.use((req, res, next) => {
  req.con = con;
  next();
});

app.set('view engine', 'hbs');
app.use(cookieParser('secret key'));
app.use(express.urlencoded({ extended: false }));
app.use("/employee", employeeRouter);
app.use("/employer", employerRouter);
app.get("", (req, res) => {
  res.redirect("/login");
});
app.use("", authRouter);
app.listen(port, () => {
  console.log(`Search_job app listening at http://localhost:${port}`);
});
