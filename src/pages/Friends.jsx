import React from 'react';
import { useLoaderData } from 'react-router-dom';
import AddFriend from '../components/friends/AddFriend';
import FriendList from '../components/friends/FriendList';
import fetchAndSetCurrentUser from '../utils/fetch/fetchAndSetCurrentUser';
import getCurrentUser from '../utils/getCurrentUser';

export default function Friends() {
  const friends = useLoaderData();

  // Suggest a bot user to add if the user doesn't have friends
  let noFriendsTip;

  if (friends.length === 0) {
    noFriendsTip = (
      <div className="no-friends-tip">
        <p>You haven&apos;t added any friends yet.</p>
        <p>
          Don&apos;t know who to add? You can always add The Count. He loves
          counting the number of messages you send him.
        </p>
        <p>
          His username is <em>the count</em>.
        </p>
      </div>
    );
  }

  return (
    <>
      {noFriendsTip}
      <FriendList friends={friends} />
      <AddFriend />
    </>
  );
}

export async function friendLoader() {
  await fetchAndSetCurrentUser();
  const currentUser = getCurrentUser();
  const { friends } = currentUser;
  return friends;
}
