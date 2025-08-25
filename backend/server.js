const express = require("express");
const app = express();
const port = 3000

app.get("/",(req,res,next) => {
  res.send("TO DO LIST :)");
});

app.listen(port, () => {
  console.log("To-do API running at http://localhost:3000");
});


app.use(express.json());
