const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
app.get("/", (req, res) => {
  res.send("Hello World Mara Kha!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
