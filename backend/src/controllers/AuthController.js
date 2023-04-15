import User from '../Models/User';
import bcrypt from 'bcrypt';
const AuthController = {
  //Register
  registerUser: async (req, res) => {
    try {
      // hashcode mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      //Create a new user
      const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashed,
      });
      //Lưu vào DB
      const user = await newUser.save();
      res.status(200).json(user);
      // res.json(req.body)
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //Login
  loginUser: async (req, res) => {
    try {
      //Lấy username cần tìm trong db
      const user = await User.findOne({ userName: req.body.userName });
      if (!user) {
        res.status(404).json('Wrong user name');
      }
      //So sánh password xem có đúng hay không
      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      console.log(validPassword);
      if (!validPassword) {
        res.status(404).json('wrong password');
      }
      if (user && validPassword) {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default AuthController;
