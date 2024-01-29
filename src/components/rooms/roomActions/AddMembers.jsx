/* eslint-disable react/prop-types */
import React from 'react';
import convertToGroupRoom from '@utils/fetch/convertToGroupRoom';
import addMemberToRoom from '@utils/fetch/addMemberToRoom';
import getCurrentUser from '@utils/getCurrentUser';
import getUser from '@utils/fetch/getUser';

async function handleAddMember(userId, room, setMembersChanged) {
  if (!room.isGroup) {
    const res = await convertToGroupRoom(room._id);
    // TODO: handle error
  }
  // TODO: handle error
  const res = await addMemberToRoom(room._id, userId);
  setMembersChanged((prev) => !prev); // Trigger fetch effect
}

async function handleAddMemberByUsername(e, room, setMembersChanged) {
  e.preventDefault();
  const memberUsername = e.target.username.value;
  const member = await getUser(memberUsername);
  const memberId = member._id;

  await handleAddMember(memberId, room, setMembersChanged);
  e.target.username.value = '';
}

// TODO: Add members by username
export default function AddMembers({ room, setMembersChanged }) {
  const currentUser = getCurrentUser();
  const { friends } = currentUser;

  const friendList = (
    <div className="add-friends-container">
      <h2>Add friends</h2>
      <menu className="add-friends">
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
      <div className="add-member-by-username-container">
        <h2>Add a member by username</h2>
        <form
          onSubmit={(e) =>
            handleAddMemberByUsername(e, room, setMembersChanged)
          }
          className="add-member-by-username"
        >
          <input type="text" placeholder="username" name="username" required />
        </form>
      </div>
    </div>
  );
}

function FriendListItem({ room, friend, setMembersChanged }) {
  return (
    <button
      type="button"
      onClick={() => handleAddMember(friend._id, room, setMembersChanged)}
    >
      {friend.username}
    </button>
  );
}
