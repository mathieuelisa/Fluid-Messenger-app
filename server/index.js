const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes.js");

require("dotenv").config();

app.use(cors());
app.use(express.json());

// app.get("/auth", (req, res) => {
//   res.send("Fluid messenger application !!");
// });

//Auth Routes
app.use("/auth", authRoutes);

//server running on 8000 port
app.listen(PORT, () => {
  console.log(`Your server running on PORT: ${PORT}`);
});
