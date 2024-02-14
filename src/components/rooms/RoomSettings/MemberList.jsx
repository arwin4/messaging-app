import React from 'react';
import getCurrentUser from '@utils/getCurrentUser';
import roomPropType from '@components/propTypes/roomPropType';
import './style/MemberList.css';
import { InlineIcon } from '@iconify/react';
import MemberListItem from './MemberListItem';

export default function MemberList({ room }) {
  const currentUser = getCurrentUser();

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
            <MemberListItem key={member._id} room={room} member={member} />
          );
        })}
      </ul>
    </div>
  );
}

/* Prop Types */
MemberList.propTypes = {
  room: roomPropType.isRequired,
};
