import User from '../Models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Lưu trữ refresh tokens
let refreshTokenDB = [];
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

  //Generate access token
  generateAccessToken: user => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '20s' } //Thời gian hết hạn Key
    );
  },

  //Generate refresh token
  generateRefreshToken: user => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: '30d' } //Thời gian hết hạn Key
    );
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
      if (!validPassword) {
        res.status(404).json('wrong password');
      }
      if (user && validPassword) {
        //Tạo token
        const accessToken = AuthController.generateAccessToken(user);
        //Token dữ trữ
        const refreshToken = AuthController.generateRefreshToken(user);
        //Lưu refresh token vào DB
        refreshTokenDB.push(refreshToken);
        //Lưu trữ refresh token vào cookies
        res.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: false, //Khi deploy thì set lại thành true
          path: '/',
          //Ngăn chặn tấn công CSRF
          sameSite: 'strict',
        });
        //Loại password ra kh hiện vào truy xuất user
        const { password, ...others } = user._doc;
        res.status(200).json({ others, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //Yêu cầu refresh token
  requestRefreshToken: async (req, res) => {
    //Take refresh token from user -> refresh token là lâu dài nên dựa vào nó để tạo ra 1 cái access token mới, và đồng thời tạo 1 cái refresh token mới
    const refreshToken = req.cookies.refresh_token;
    //Lỗi chưa đăng nhập nhưng refresh
    if (!refreshToken) {
      return res.status(401).json('you are not authenticate');
    }
    //Nếu không tồn tại trong DB token thì báo lỗi kh phải của mình
    if (!refreshTokenDB.includes(refreshToken)) {
      return res.status(403).json('refresh token is not valid');
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      //Nếu không phải người dùng hoặc hết hạn thì trả ra lỗi
      if (err) {
        console.log('err : ' + err);
      }
      //Loại bỏ token cũ để thêm token mới
      refreshTokenDB = refreshTokenDB.filter(token => token !== refreshToken);
      //create access token and refresh token
      const newAccessToken = AuthController.generateAccessToken(user);
      const newRefreshToken = AuthController.generateRefreshToken(user);
      //Thêm token mới vào DB token
      refreshTokenDB.push(newRefreshToken);
      //Lưu vào cookies
      res.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        secure: false, //Khi deploy thì set lại thành true
        path: '/',
        //Ngăn chặn tấn công CSRF
        sameSite: 'strict',
      });
      return res
        .status(200)
        .json({ accessToken: newAccessToken, refreshTokenDB });
    });
  },
};

export default AuthController;
