/* eslint-disable react/prop-types */
import React from 'react';
import getCurrentUser from '../../utils/getCurrentUser';

export default function Title({ room }) {
  const { members } = room;
  const currentUser = getCurrentUser();
  console.log(currentUser);

  const memberNames = members.map((member) => member.username);

  const formattedMemberNames = members.map((member, i, { length }) => {
    if (length === 1) return 'yourself';
    if (length - 2 === i) return `${member.username} `;
    if (length - 1 === i) return `and ${member.username}`;
    return `${member.username}, `;
  });

  return <h1>Your conversation with {formattedMemberNames} </h1>;
}