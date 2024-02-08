import React, { useEffect, useRef } from 'react';
import { format, formatRelative } from 'date-fns';
import './style/Messages.css';
import getCurrentUser from '@utils/getCurrentUser';
import roomPropType from '@components/propTypes/roomPropType';
import socketMessagesPropType from '@components/propTypes/socketMessagesPropType';

export default function Messages({ room, socketMessages }) {
  const { messages } = room;
  const messagesRef = useRef(null);

  const currentUser = getCurrentUser();

  // Scroll down to latest message on both mount and new message
  // Source: https://www.codingbeautydev.com/blog/react-scroll-to-bottom-of-div
  function scrollToNewMessage() {
    const lastChildElement = messagesRef.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToNewMessage();
  }, [socketMessages]);

  const fetchAndSocketMessages = messages.concat(socketMessages);

  const noMessagesElement = <h2 className="no-messages">No messages yet.</h2>;

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
        ref={messagesRef}
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

  return (
    <div className="messages">
      {fetchAndSocketMessages.length > 0 ? messagesElement : noMessagesElement}
    </div>
  );
}

/* Prop Types */
Messages.propTypes = {
  room: roomPropType.isRequired,
  socketMessages: socketMessagesPropType.isRequired,
};
