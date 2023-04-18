import React from 'react';
import "./Home.scss";
const Home = () => {
  const userData = [
    {
      username: 'anhduy1202',
    },
    {
      username: 'kelly1234',
    },
    {
      username: 'danny5678',
    },
    {
      username: 'kenny1122',
    },
    {
      username: 'jack1234',
    },
    {
      username: 'loi1202',
    },
    {
      username: 'nhinhi2009',
    },
    {
      username: 'kellynguyen1122',
    },
  ];
  return (
    <div className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {userData.map(user => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user"> Delete </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
