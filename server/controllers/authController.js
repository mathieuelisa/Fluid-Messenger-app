const bcrypt = require("bcrypt");
const { v1: uuidv1 } = require("uuid");
const { connect } = require("getstream");
const StreamChat = require("stream-chat");

require("dotenv").config();

const signup = async (req, res) => {
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
};

module.exports = { signup };
