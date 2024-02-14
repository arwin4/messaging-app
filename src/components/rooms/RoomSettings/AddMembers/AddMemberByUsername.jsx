import { InlineIcon } from '@iconify/react';
import React from 'react';
import roomPropType from '@components/propTypes/roomPropType';
import getUser from '@utils/fetch/getUser';
import handleAddMember from './handleAddMember';

export default function AddMemberByUsername({ room }) {
  async function handleAddMemberByUsername(e, localRoom) {
    e.preventDefault();
    const memberUsername = e.target.username.value;
    const member = await getUser(memberUsername);
    const memberId = member._id;

    await handleAddMember(memberId, localRoom);
    e.target.username.value = '';
  }

  return (
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
  );
}

/* Prop Types */
AddMemberByUsername.propTypes = {
  room: roomPropType.isRequired,
};
