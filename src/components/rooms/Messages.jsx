import React from 'react';

export default function Messages({ room, socketMessages }) {
  const { messages } = room;

  const fetchAndSocketMessages = messages.concat(socketMessages);

  const messagesElement = fetchAndSocketMessages.map((message) => (
    <div key={message._id} className="message">
      <div className="date-created">{message.dateCreated}</div>
      <div className="author">{message.author.username}</div>
      <div className="text-content">{message.content.textContent}</div>
    </div>
  ));

  return <div className="messages">{messagesElement}</div>;
}
