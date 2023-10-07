import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:3005');

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup: disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const renderMessages = () => {
    return messages.map((message, index) => (
      <li key={index}>
        {message.message} - {message.timestamp} - {message.priority}
        <br />
      </li>
    ));
  };

  return (
    <ul>
      {renderMessages()}
    </ul>
  );
};

export default App;
