/* eslint-disable react/prop-types */
import React from 'react';

export default function Title({ room }) {
  const { members } = room;
  console.log(JSON.parse(localStorage.getItem('user')));

  const memberNames = members.map((member) => member.username);

  const formattedMemberNames = members.map((member, i, { length }) => {
    if (length === 1) return 'yourself';
    if (length - 2 === i) return `${member.username} `;
    if (length - 1 === i) return `and ${member.username}`;
    return `${member.username}, `;
  });

  console.log(memberNames);
  return <h1>Your conversation with {formattedMemberNames} </h1>;
}
