const { User, validateUser, validateLogin } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password, phoneNumber, address } = req.body;

  let user = await User.findOne({ phoneNumber });
  if (user) return res.status(400).send("User already registered");

  user = new User({
    name: name,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    address: address,
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();
  res.status(201).json({ name, phoneNumber });
};

exports.login = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.send(error.details[0].message);

  const { phoneNumber, password } = req.body;

  const user = await User.findOne({ phoneNumber });
  if(!user) return res.status(401).send("Invalid credentials.");

  const verifyPassword = await bcrypt.compare(password, user.password);
  if(!verifyPassword) return res.status(401).send("Invalid credentials");

  const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");
  res.header('x-auth-token', token).send(token);
};
