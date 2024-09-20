const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.json({ message: `Hello from express.js ${process.pid}` });
});

app.listen(3000, () => {
  console.log("Server is listening on Port 3000");
});
