import { InlineIcon } from '@iconify/react';
import React from 'react';
import roomPropType from '@components/propTypes/roomPropType';
import getCurrentUser from '@utils/getCurrentUser';
import FriendListItem from './FriendListItem';

export default function FriendList({ room }) {
  const currentUser = getCurrentUser();
  const { friends } = currentUser;

  return (
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
}

/* Prop Types */
FriendList.propTypes = {
  room: roomPropType.isRequired,
};
