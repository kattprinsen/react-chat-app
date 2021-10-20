import React, { useEffect, useState, useRef } from 'react';

import './ChatRoom.css';
import useChat from '../../utils/useChat';
import useTyping from '../../utils/useTyping';
import { toEncrypt, toDecrypt } from '../../utils/aes.js';
import ChatMessage from '../ChatMessage/ChatMessage';
import NewMessageForm from '../NewMessageForm/NewMessageForm';
import TypingMessage from '../TypingMessage/TypingMessage';
import Users from '../Users/Users';
import UserAvatar from '../UserAvatar/UserAvatar';

const ChatRoom = (props) => {

  const { roomId } = props.match.params;
  const {
    messages,
    user,
    users,
    typingUsers,
    sendMessage,
    startTypingMessage,
    stopTypingMessage
  } = useChat(roomId);

  const [newMessage, setNewMessage] = useState('');

  const {
    isTyping,
    startTyping,
    stopTyping,
    cancelTyping
  } = useTyping();

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    //toEncrypt(newMessage);
    //toDecrypt(newMessage);
    cancelTyping();
    sendMessage(newMessage);
    setNewMessage('');
  };

  const ScrollToBottom = () => {
    const messagesEndref = useRef(null);
    useEffect(() => messagesEndref.current.scrollIntoView({behavior: 'smooth'}));
    return (<div ref={messagesEndref} />);
  }

  useEffect(() => {
    if(isTyping) {
      startTypingMessage();
    } else {
      stopTypingMessage();
    }
  }, [isTyping]);

  return (
    <div className='chat-room-container'>
      <div className='chat-room-top-bar'>
        <h1 className='room-name'>Room: {roomId} </h1>
        {user && <UserAvatar user={user}></UserAvatar>}
    </div>
    <Users users={users}></Users>
    <div className='messages-container'>
      <ol className='messages-list'>
        {messages.map((message, i) => (
          <li key={i}>
            <ChatMessage message={message}></ChatMessage>
          </li>
        ))}
        {typingUsers.map((user, i) => (
          <li key={messages.length + i}>
            <TypingMessage user={user}></TypingMessage>
          </li>
        ))}
      </ol>
      <ScrollToBottom />
      </div>
      <NewMessageForm
        newMessage={newMessage}
        handleNewMessageChange={handleNewMessageChange}
        handleStartTyping={startTyping}
        handleStopTyping={stopTyping}
        handleSendMessage={handleSendMessage}>
      </NewMessageForm>
    </div>
  );
};

export default ChatRoom;
