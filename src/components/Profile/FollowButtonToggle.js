import React from 'react';
import { FaPlus } from 'react-icons/fa';
const FollowButtonToggle = props => {
  const { profile, currentUser } = props;
  const following = props.profile.following;
  return (
    <button
      className="btn btn-sm action-btn btn-outline-secondary"
      onClick={() => props.handleClick(following)}
      disabled={!currentUser}
    >
      <FaPlus />
      &nbsp;
      {following ? 'Unfollow' : 'Follow'} {profile && profile.username}
    </button>
  );
};
export default FollowButtonToggle;
