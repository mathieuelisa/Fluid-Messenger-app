const bcrypt = require("bcrypt");
const { v1: uuidv1 } = require("uuid");
const { connect } = require("getstream");
const StreamChat = require("stream-chat").StreamChat;

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

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const client = connect(
      process.env.API_KEY,
      process.env.API_SECRET,
      process.env.API_ID
    );
    const myUser = StreamChat.getInstance(
      process.env.API_KEY,
      process.env.API_SECRET
    );
    const { users } = await myUser.queryUsers({ name: username });

    if (!users.length)
      return res.status(400).json({ message: "User not found" });

    const successful = await bcrypt.compare(password, users[0].hashPassword);

    const myTokenId = client.createUserToken(users[0].id);
    const idOfUser = users[0].id;
    const nameOfUser = users[0].name;

    if (successful) {
      res.status(200).json({ username: nameOfUser, myTokenId, idOfUser });
    } else {
      res.status(500).json({ message: "Wrong password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = { signup, login };
