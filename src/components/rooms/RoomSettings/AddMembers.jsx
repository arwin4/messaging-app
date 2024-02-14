import React from 'react';
import getCurrentUser from '@utils/getCurrentUser';
import roomPropType from '@components/propTypes/roomPropType';
import './style/AddMembers.css';
import FriendList from './AddMembers/FriendList';
import AddMemberByUsername from './AddMembers/AddMemberByUsername';

// TODO: Add members by username
export default function AddMembers({ room }) {
  const currentUser = getCurrentUser();
  const { friends } = currentUser;

  const allFriendsAreInThisRoom = friends.every((friend) =>
    room.members.some((member) => member._id === friend._id),
  );

  return (
    <div className="add-members">
      {
        /* Display friendList only when there are friends to be added */
        friends.length > 0 && !allFriendsAreInThisRoom && (
          <FriendList room={room} />
        )
      }
      <AddMemberByUsername room={room} />
    </div>
  );
}

/* Prop Types */
AddMembers.propTypes = {
  room: roomPropType.isRequired,
};
