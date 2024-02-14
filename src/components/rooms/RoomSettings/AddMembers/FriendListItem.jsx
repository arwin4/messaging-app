import React, { useState } from 'react';
import LabelButton from '@components/buttons/LabelButton';
import roomPropType from '@components/propTypes/roomPropType';
import friendPropType from '@components/propTypes/friendPropType';
import handleAddMember from './handleAddMember';

export default function FriendListItem({ room, friend }) {
  const [addFriendBusy, setAddFriendBusy] = useState(false);

  async function handleAddFriend(userId, localRoom) {
    setAddFriendBusy(true);
    await handleAddMember(userId, localRoom);
  }

  return (
    <LabelButton
      onClick={() => handleAddFriend(friend._id, room)}
      icon="ri:add-line"
      text={friend.username}
      inline="true"
      busy={addFriendBusy}
    />
  );
}

/* Prop Types */
FriendListItem.propTypes = {
  room: roomPropType.isRequired,
  friend: friendPropType.isRequired,
};
