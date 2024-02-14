import React from 'react';
import convertToGroupRoom from '@utils/fetch/convertToGroupRoom';
import addMemberToRoom from '@utils/fetch/addMemberToRoom';
import getCurrentUser from '@utils/getCurrentUser';
import getUser from '@utils/fetch/getUser';
import roomPropType from '@components/propTypes/roomPropType';
import friendPropType from '@components/propTypes/friendPropType';
import './style/AddMembers.css';
import { InlineIcon } from '@iconify/react';
import LabelButton from '@components/buttons/LabelButton';

async function handleAddMember(userId, room) {
  if (!room.isGroup) {
    const res = await convertToGroupRoom(room._id);
    // TODO: handle error
  }
  // TODO: handle error
  const res = await addMemberToRoom(room._id, userId);
}

async function handleAddMemberByUsername(e, room) {
  e.preventDefault();
  const memberUsername = e.target.username.value;
  const member = await getUser(memberUsername);
  const memberId = member._id;

  await handleAddMember(memberId, room);
  e.target.username.value = '';
}

// TODO: Add members by username
export default function AddMembers({ room }) {
  const currentUser = getCurrentUser();
  const { friends } = currentUser;

  const friendList = (
    <div className="add-friends-container">
      <h2 className="section-title">
        <InlineIcon className="icon" icon="ri:user-heart-line" height="unset" />
        Add friends
      </h2>{' '}
      <menu className="add-friends">
        {friends.map((friend) => {
          // Don't display friends that are members of this room already
          if (room.members.some((member) => member._id === friend._id))
            return null;

          return (
            <FriendListItem room={room} friend={friend} key={friend._id} />
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
        <h2 className="section-title">
          <InlineIcon className="icon" icon="ri:input-field" height="unset" />
          Add member by username
        </h2>
        <form
          onSubmit={(e) => handleAddMemberByUsername(e, room)}
          className="add-member-by-username"
        >
          <input
            className="add-member-input"
            type="text"
            placeholder="username"
            name="username"
            autoComplete="off"
            required
          />
        </form>
      </div>
    </div>
  );
}

function FriendListItem({ room, friend }) {
  return (
    <LabelButton
      onClick={() => handleAddMember(friend._id, room)}
      icon="ri:add-line"
      text={friend.username}
      inline="true"
    />
  );
}

/* Prop Types */
AddMembers.propTypes = {
  room: roomPropType.isRequired,
};

FriendListItem.propTypes = {
  room: roomPropType.isRequired,
  friend: friendPropType.isRequired,
};
