const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", (req, res) => {
  res.json({ data: "API is working" });
});

app.listen(6000, () => {
  console.log("Server is running on port 6000");
});
