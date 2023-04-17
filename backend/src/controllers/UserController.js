import User from '../Models/User';

const UserController = {
  //lấy ra tất cả User
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //Xoá 1 user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(`delete success ${user.userName}`);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default UserController;
