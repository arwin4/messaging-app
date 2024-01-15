/* eslint-disable react/prop-types */
import React from 'react';
import { Form } from 'react-router-dom';
import './style/FriendList.css';

export default function FriendList({ friends }) {
  return (
    <div className="friend-list">
      <h2>Friends</h2>
      {/* Use react router's Form to leverage loaders & actions */}
      {friends.map((friend) => (
        <Form className="friend-wrapper" key={friend} method="DELETE">
          <input name="friend-to-delete" value={friend} readOnly />
          <button type="submit">Remove friend</button>
        </Form>
      ))}
    </div>
  );
}
