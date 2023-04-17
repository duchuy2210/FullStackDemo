import verifyToken from './verifyToken';

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    //Chỉ cho phép admin xoá tất cả tài khoản  và chỉnh nó tự xoá
    if (req.user.id == req.params.id || req.user.admin) {
      next();
    } else {
      return res.status(403).json("You're not allowed to delete this user");
    }
  });
};
export default verifyUser;
