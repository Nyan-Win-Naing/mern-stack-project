const User = require("../models/User");
const createToken = require("../helpers/createToken");

const UserController = {
  login: (req, res) => {
    return res.json({ msg: "user login api hit" });
  },
  register: async (req, res) => {
    try {
      let { name, email, password } = req.body;
      let user = await User.register(name, email, password);

      // create token
      let token = createToken(user._id);

      res.cookie('jwt', token);

      return res.json({user, token});
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  },
};

module.exports = UserController;
