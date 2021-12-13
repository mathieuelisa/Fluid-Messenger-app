const PORT = 8000;
const express = require("express");
const app = express();
const cors = require("cors");

const authRoutes = require("./routes/auth.js");

require("dotenv").config();

app.use(cors());
app.use(express.json());

//Auth Routes
app.use(authRoutes);

//server running on 8000 port
app.listen(PORT, () => {
  console.log(`Your server runnong on PORT: ${PORT}`);
});
