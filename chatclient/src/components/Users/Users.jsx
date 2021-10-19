import React from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import './Users.css';

const Users = ({ users }) => {
  return users.length > 0 ? (
    <div>
      <h2> Users in this room: </h2>
      <ul className="user-list">
        {users.map((user, index) => (
          <li key={index} className="user-box">
            <span> {user.name} </span>
            <UserAvatar user={user}></UserAvatar>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>There is no-one else here! </div>
  );
};

export default Users;
