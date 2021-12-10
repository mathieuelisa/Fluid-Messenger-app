const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Your server runnong on PORT: ${PORT}`);
});
