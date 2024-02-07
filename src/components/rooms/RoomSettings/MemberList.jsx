import React from 'react';
import PropTypes from 'prop-types';
import getCurrentUser from '@utils/getCurrentUser';
import deleteMember from '@utils/fetch/deleteMember';
import roomPropType from '@components/propTypes/roomPropType';
import './style/MemberList.css';
import { InlineIcon } from '@iconify/react';
import LabelButton from '@components/buttons/LabelButton';

export default function MemberList({ room, setMembersChanged }) {
  const currentUser = getCurrentUser();

  async function removeMember(memberId) {
    await deleteMember(room._id, memberId);
    setMembersChanged((prev) => !prev); // Trigger fetch effect
  }

  return (
    <div className="member-list-container">
      <h2 className="section-title">
        <InlineIcon className="icon" icon="ri:group-line" height="unset" />
        Members
      </h2>
      <ul className="member-list">
        {room.members.length === 1 && (
          <div className="no-other-members-message">
            You&apos;re the only member.
          </div>
        )}

        {room.members.map((member) => {
          // Don't display current user in member list
          if (member.username === currentUser.username) return null;
          return (
            <li className="member" key={member._id}>
              <div className="username">{member.username}</div>
              <LabelButton
                onClick={() => removeMember(member._id)}
                icon="ri:close-line"
                text="Remove"
                inline="true"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* Prop Types */
MemberList.propTypes = {
  room: roomPropType.isRequired,
  setMembersChanged: PropTypes.func.isRequired,
};
