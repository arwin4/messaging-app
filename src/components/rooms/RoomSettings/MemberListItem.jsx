import PropTypes from 'prop-types';
import LabelButton from '@components/buttons/LabelButton';
import deleteMember from '@utils/fetch/deleteMember';
import React, { useState } from 'react';
import roomPropType from '@components/propTypes/roomPropType';

export default function MemberListItem({ room, member }) {
  const [pendingRemoveMember, setPendingRemoveMember] = useState(false);

  async function removeMember(memberId) {
    setPendingRemoveMember(true);
    await deleteMember(room._id, memberId);
  }

  return (
    <li className="member">
      <div className="username">{member.username}</div>
      <LabelButton
        onClick={() => removeMember(member._id)}
        icon="ri:close-line"
        text="Remove"
        inline="true"
        busy={pendingRemoveMember}
      />
    </li>
  );
}

/* Prop Types */
MemberListItem.propTypes = {
  room: roomPropType.isRequired,
  member: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
