const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';

const verifyToken = (req, res, next) => {
  //Lấy token từ người dùng
  const token = req.headers.token;
  //Bearer token => Để lấy token phải bỏ vào mảng và chọn phàn tử thứ 2
  const access_token = token
    ? token.split(' ')[1]
    : '';

  //Kiểm tra xem có access_token không, nếu kh trả ra lỗi
  if (!access_token || access_token === 'undefined') {
    return res.status(401).json('access_token is needed');
  }

  //Xác thực token
  jwt.verify(access_token, process.env.JWT_ACCESS_KEY, (err, user) => {
    //Nếu không phải người dùng hoặc hết hạn thì trả ra lỗi
    if (err) {
      return res.status(403).json('Forbidden or outdated token');
    }
    req.user = user
    next();
  });
};
export default verifyToken;
