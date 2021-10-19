import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

const Home = () => {
  const [roomName, setRoomName] = useState('');

  const handleRoomChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <div className="home-container">
      <input type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomChange}
        className="home-input-field" />
        <Link to={`/${roomName}`} className="home-room-button">
          Join Room
        </Link>
      </div>
  );
};

export default Home;
