const User = require("../models/User");

const UserController = {
  login: (req, res) => {
    return res.json({ msg: "user login api hit" });
  },
  register: async (req, res) => {
    try {
      let { name, email, password } = req.body;
      let user = await User.register(name, email, password);

      return res.json(user);
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  },
};

module.exports = UserController;
