/* eslint-disable react/prop-types */
import React from 'react';

export default function Messages({ room }) {
  const { messages } = room;

  return (
    <>
      {messages.map((message) => (
        <div key={message._id} className="message">
          <div className="date-created">{message.dateCreated}</div>
          <div className="author">{message.author.username}</div>
          <div className="text-content">{message.content.textContent}</div>
        </div>
      ))}
    </>
  );
}
