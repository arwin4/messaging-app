import React from 'react';
import { redirect, useLoaderData } from 'react-router-dom';
import AddFriend from '../components/friends/AddFriend';
import FriendList from '../components/friends/FriendList';
import fetchAndSetCurrentUser from '../utils/fetch/fetchAndSetCurrentUser';
import getCurrentUser from '../utils/getCurrentUser';
import getJwt from '../utils/getJwt';
import fetchDuoRoom from '../utils/fetch/fetchDuoRoom';

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

export async function friendsLoader() {
  await fetchAndSetCurrentUser();
  const currentUser = getCurrentUser();
  const { friends } = currentUser;

  // Add room ids to friends with duo rooms
  return Promise.all(
    friends.map(async (friend) => {
      const res = await fetchDuoRoom(friend.username);

      // No duo room found
      if (res.status === 204) return friend;

      // Duo room found, save its id
      const duoRoom = await res.json();
      const friendWithDuoRoomId = { ...friend, duoRoomId: duoRoom._id };
      return friendWithDuoRoomId;
    }),
  );
}

export async function friendsAction({ request }) {
  const data = await request.formData();

  // Handle add friend
  if (request.method === 'PATCH') {
    const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/friends`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newFriend: data.get('new-friend'),
      }),
    });

    if (res.status !== 200) {
      // TODO: fix error message
      console.log(await res.text());
      return { error: res.error };
    }
  }

  // Handle delete friend
  if (request.method === 'DELETE') {
    const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/friends`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        friendsToDelete: [data.get('friend-to-delete')],
      }),
    });

    if (res.status !== 200) {
      // TODO: fix error message
      console.log(await res.text());
      return { error: res.error };
    }
  }

  return redirect('');
}
