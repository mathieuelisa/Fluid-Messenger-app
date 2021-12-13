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
    const token = client.createUserToken(userId);

    res.status(200).json({ username, password, userId, hashPassword, token });
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

    const success = await bcrypt.compare(password, users[0].hashPassword);

    const token = client.createUserToken(users[0].id);
    const userId = users[0].id;
    const nameOfUser = users[0].name;
    const hashPassword = users[0].hashPassword;

    if (success) {
      res.status(200).json({
        token,
        username: nameOfUser,
        userId,
        hashPassword,
      });
    } else {
      console.log("Error password");
      res.status(500).json({ message: "Wrong password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = { signup, login };
