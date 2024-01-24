/* eslint-disable react/prop-types */
import React from 'react';
import convertToGroupRoom from '../../../utils/fetch/convertToGroupRoom';
import addMemberToRoom from '../../../utils/fetch/addMemberToRoom';
import getCurrentUser from '../../../utils/getCurrentUser';

// TODO: Add members by username
export default function AddMembers({ room, setMembersChanged }) {
  const currentUser = getCurrentUser();
  const { friends } = currentUser;

  const friendList = (
    <div className="friend-list-container">
      <h2>Add friends</h2>
      <menu className="friend-list">
        {friends.map((friend) => {
          // Don't display friends that are members of this room already
          if (room.members.some((member) => member._id === friend._id))
            return null;

          return (
            <FriendListItem
              room={room}
              friend={friend}
              setMembersChanged={setMembersChanged}
              key={friend._id}
            />
          );
        })}
      </menu>
    </div>
  );

  const allFriendsAreInThisRoom = friends.every((friend) =>
    room.members.some((member) => member._id === friend._id),
  );

  return (
    <div className="add-members">
      {
        /* Display friendList only when there are friends to be added */
        friends.length > 0 && !allFriendsAreInThisRoom && friendList
      }
      <div className="add-members-by-username-container">
        <h2>Add a member by username</h2>
      </div>
    </div>
  );
}

function FriendListItem({ room, friend, setMembersChanged }) {
  async function handleAddMember(userId) {
    if (!room.isGroup) {
      const res = await convertToGroupRoom(room._id);
      // TODO: handle error
    }
    // TODO: handle error
    const res = await addMemberToRoom(room._id, userId);
    setMembersChanged((prev) => !prev); // Trigger fetch effect
  }

  return (
    <button type="button" onClick={() => handleAddMember(friend._id)}>
      {friend.username}
    </button>
  );
}
