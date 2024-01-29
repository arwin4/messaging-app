import React from 'react';
import PropTypes from 'prop-types';
import getCurrentUser from '@utils/getCurrentUser';
import deleteMember from '@utils/fetch/deleteMember';
import roomPropType from '@components/propTypes/roomPropType';

export default function MemberList({ room, setMembersChanged }) {
  const currentUser = getCurrentUser();

  async function removeMember(memberId) {
    await deleteMember(room._id, memberId);
    setMembersChanged((prev) => !prev); // Trigger fetch effect
  }

  return (
    <div className="member-list-container">
      <h2>Members</h2>
      <menu className="member-list">
        {room.members.length === 1 && `You're the only member.`}
        {room.members.map((member) => {
          // Don't display current user in member list
          if (member.username === currentUser.username) return null;
          return (
            <li key={member._id}>
              <div>{member.username}</div>
              <button type="button" onClick={() => removeMember(member._id)}>
                Remove
              </button>
            </li>
          );
        })}
      </menu>
    </div>
  );
}

/* Prop Types */
MemberList.propTypes = {
  room: roomPropType.isRequired,
  setMembersChanged: PropTypes.func.isRequired,
};
