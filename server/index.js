const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes.js");

require("dotenv").config();

app.use(cors());
app.use(express.json());

//Auth Routes
app.use(authRoutes);

app.get("/", (req, res) => {
  res.send("Fluid messenger application");
});

//server running on 8000 port
app.listen(PORT, () => {
  console.log(`Your server runnong on PORT: ${PORT}`);
});
