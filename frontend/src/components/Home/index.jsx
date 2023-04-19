import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUser, getAllUsers } from '../../redux/apiRequest';
import { createAxios } from "../../createInstance";
import './Home.scss';
import { loginSuccess } from '../../redux/authSlice';

const Home = () => {
  //optional chaining : ?
  //ternary operation: ? : if
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Lấy data từ store redux
  const user = useSelector(state => state.auth.login?.currentUser);
  const allUsers = useSelector(state => state.users.getUsers?.allUsers);
  const msg = useSelector(state => state.users.message);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  //Tạo toast message
  useEffect(() => {
    if (msg) toast(msg);
  }, [msg]);
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    getAllUsers(user?.accessToken, dispatch);
    // console.log('data:', data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = id => {
    deleteUser(user.accessToken, dispatch, id);
  };

  return (
    <div className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {allUsers &&
          allUsers.map((user, index) => {
            return (
              <div key={index} className="user-container">
                <div className="home-user">{user.userName}</div>
                <div
                  className="delete-user"
                  onClick={() => handleDelete(user._id)}>
                  {' '}
                  Delete{' '}
                </div>
              </div>
            );
          })}
      </div>
      {msg}
    </div>
  );
};

export default Home;
