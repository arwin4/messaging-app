import React from 'react';
import PropTypes from 'prop-types';
import { Link, useFetcher, useNavigate, useNavigation } from 'react-router-dom';
import './style/FriendList.css';
import createRoom from '@utils/fetch/createRoom';
import addMemberToRoom from '@utils/fetch/addMemberToRoom';
import friendPropType from '@components/propTypes/friendPropType';
import LabelButton from '@components/buttons/LabelButton';
import LinkButton from '@components/buttons/LinkButton';

export default function FriendList({ friends }) {
  return (
    <>
      <h1>Friends</h1>
      {friends.length > 0 && (
        <div className="friend-list">
          {friends.map((friend) => (
            <FriendListItem friend={friend} key={friend._id} />
          ))}
        </div>
      )}
    </>
  );
}

// Creates a new room, adds friend to it, then redirects to its page
async function openRoom(friend, navigate) {
  const newRoom = await createRoom();
  const newRoomWithFriendAdded = await addMemberToRoom(newRoom._id, friend._id);
  navigate(`/conversations/${newRoomWithFriendAdded._id}`);
}

function FriendListItem({ friend }) {
  const navigation = useNavigation();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  let destinationPath;
  if (friend.duoRoomId) {
    destinationPath = `/conversations/${friend.duoRoomId}`;
  }

  // Give 'Go to chat' button its own busy state
  let busy = '';
  if (navigation.location?.pathname === destinationPath) {
    busy = navigation.state;
  }

  return (
    // Use react router's Form to leverage loaders & actions
    <fetcher.Form className="friend-wrapper" method="DELETE">
      <input
        className="friend-username"
        name="friend-username"
        value={friend.username}
        readOnly
      />
      <menu>
        {friend.duoRoomId ? (
          <Link to={destinationPath}>
            <LinkButton
              icon="ri:chat-4-line"
              text="Go to chat"
              inline="true"
              busy={busy}
            />
          </Link>
        ) : (
          <LabelButton
            onClick={() => openRoom(friend, navigate)}
            icon="ri:chat-new-fill"
            text="New chat"
            inline="true"
          />
        )}
        <LabelButton
          type="submit"
          icon="ri:close-line"
          text="Remove"
          inline="true"
          busy={fetcher.state}
        />
      </menu>
    </fetcher.Form>
  );
}

/* Prop Types */
FriendList.propTypes = {
  friends: PropTypes.arrayOf(friendPropType).isRequired,
};

FriendListItem.propTypes = {
  friend: friendPropType.isRequired,
};
