require('dotenv').config();
const express = require("express");
const cors = require('cors')

const { connect } = require("./db");
const todosRoutes = require("./todo/todo.route");
const companyRoutes = require("./company/company.route");

const app = express();
app.use(express.json());
app.use(cors())

app.use('/todo', todosRoutes);
app.use('/company', companyRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello World!")
})

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server is running on port ${process.env.PORT}!`);
})
