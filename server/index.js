const PORT = 8000;
const express = require("express");
const bcrypt = require("bcrypt");
const { v1: uuidv1 } = require("uuid");
const { connect } = require("getstream");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userId = uuidv1();
    const hashPassword = await bcrypt.hash(password, 10);
    const client = connect(
      process.env.API_KEY,
      process.env.API_SECRET,
      process.env.API_ID
    );
    const myTokenId = client.createUserToken(userId);

    res
      .status(200)
      .json({ username, password, userId, hashPassword, myTokenId });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//server running on 8000 port
app.listen(PORT, () => {
  console.log(`Your server runnong on PORT: ${PORT}`);
});
