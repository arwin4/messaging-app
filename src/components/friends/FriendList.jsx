/* eslint-disable react/prop-types */
import React from 'react';

export default function FriendList({ friends }) {
  return (
    <div className="friend-list">
      <h2>Friends</h2>
      {friends.map((friend) => (
        <p key={friend}>{friend}</p>
      ))}
    </div>
  );
}
