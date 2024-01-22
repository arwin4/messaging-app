/* eslint-disable react/prop-types */
import React from 'react';
import { Form, NavLink, useNavigate } from 'react-router-dom';
import './style/FriendList.css';
import createRoom from '../../utils/fetch/createRoom';
import addMemberToRoom from '../../utils/fetch/addMemberToRoom';

export default function FriendList({ friends }) {
  return (
    <div className="friend-list">
      <h2>Friends</h2>
      {friends.map((friend) => (
        <FriendListItem friend={friend} key={friend._id} />
      ))}
    </div>
  );
}

// Creates a new room, adds friend to it, then redirects to its page
async function openRoom(friend, navigate) {
  const newRoom = await createRoom();
  const newRoomWithFriendAdded = await addMemberToRoom(newRoom._id, friend._id);
  navigate(`/conversations/${newRoomWithFriendAdded._id}`);
}

function FriendListItem({ friend }) {
  const navigate = useNavigate();

  const friendLink = friend.duoRoomId ? (
    <NavLink to={`/conversations/${friend.duoRoomId}`}>
      <input name="friend-to-delete" value={friend.username} readOnly />
    </NavLink>
  ) : (
    <NavLink onClick={() => openRoom(friend, navigate)}>
      <input name="friend-to-delete" value={friend.username} readOnly />
    </NavLink>
  );

  return (
    // Use react router's Form to leverage loaders & actions
    <Form className="friend-wrapper" method="DELETE">
      {friendLink}
      <button type="submit">Remove friend</button>
    </Form>
  );
}
