const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
//middleware
app.use(cors());
const bodyParser = require("body-parser");
app.use(express.json());
//middleware end
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello World Mara Kha!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
