import React from 'react';
import { format, formatRelative } from 'date-fns';
import './style/Messages.css';
import getCurrentUser from '@utils/getCurrentUser';

export default function Messages({ room, socketMessages }) {
  const { messages } = room;
  const currentUser = getCurrentUser();

  const fetchAndSocketMessages = messages.concat(socketMessages);

  const messagesElement = fetchAndSocketMessages.map((message) => {
    const isCurrentUserAuthorOfMessage =
      message.author.username === currentUser.username;

    // Format timestamps like: 'Last Thursday at 23:00'.
    // If the message is from today, leave out 'Today at' text.
    const humanReadableTimestamp =
      new Date(message.dateCreated).toDateString() === new Date().toDateString()
        ? format(message.dateCreated, 'H:mm')
        : formatRelative(message.dateCreated, Date.now());

    return (
      <div
        key={message._id}
        className={`message ${
          isCurrentUserAuthorOfMessage ? 'current-user' : ''
        }`}
      >
        <div className="metadata">
          <div className="author">
            {isCurrentUserAuthorOfMessage ? 'You' : message.author.username}
          </div>
          <div className="date-created">{humanReadableTimestamp}</div>
        </div>
        <div className="text-content">{message.content.textContent}</div>
      </div>
    );
  });

  return <div className="messages">{messagesElement}</div>;
}
