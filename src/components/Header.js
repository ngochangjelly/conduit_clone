import React from 'react';
import { FaEdit, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const Header = props => {
  const { currentUser } = props;
  return (
    <div className="flex sm:px-8 sm:px-8 md:px-32 lg:px-32 py-8">
      <div className="w-2/12 h-6">
        <Link to="/" className="pr-8 font-bold text-green-600 text-lg">
          Conduit
        </Link>
      </div>
      <div className="w-10/12 h-6">
        {!currentUser && <LoggedoutHeader />}
        {currentUser && <LoggedinHeader currentUser={currentUser} />}
      </div>
    </div>
  );
};
const LoggedoutHeader = props => {
  return (
    <ul className="inline-flex w-full ">
      <li className="pr-2 flex-end ml-auto">
        <Link
          className="text-gray-500 text-sm focus:text-green-600 hover:text-green-600"
          to="/"
        >
          Home
        </Link>
      </li>
      <li className="pr-2 flex-end ml-auto">
        <Link
          className="text-gray-500 text-sm focus:text-green-600 hover:text-green-600"
          to="/login"
        >
          Sign in
        </Link>
      </li>
      <li className="pr-2 flex-end ml-auto">
        <Link
          className="text-gray-500 text-sm focus:text-green-600 hover:text-green-600"
          to="/register"
        >
          Sign up
        </Link>
      </li>
    </ul>
  );
};
const LoggedinHeader = props => {
  return (
    <ul className="inline-flex w-full">
      <li className="pr-2 flex-end ml-auto">
        <Link
          className="text-gray-500 text-sm focus:text-green-600 hover:text-green-600"
          to="/"
        >
          Home
        </Link>
      </li>
      <li className="pr-2 flex-end ml-auto">
        <Link
          className="text-gray-500 text-sm focus:text-green-600 hover:text-green-600"
          to={`/editor`}
        >
          <FaEdit className="inline-flex" /> New Post
        </Link>
      </li>
      <li className="pr-2 flex-end ml-auto">
        <Link
          className="text-gray-500 text-sm focus:text-green-600 hover:text-green-600"
          to={`/settings`}
        >
          <FaCog className="inline-flex" /> Settings
        </Link>
      </li>
      <li className="pr-2 flex-end ml-auto">
        <Link
          to={`/@${props.currentUser.username}`}
          className="inline-flex text-gray-500 text-sm focus:text-green-600 hover:text-green-600"
        >
          <img
            src={props.currentUser.image}
            className="pr-1 rounded-full h-8 w-8"
            alt={props.currentUser.username}
          />
          {props.currentUser.username}
        </Link>
      </li>
    </ul>
  );
};
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};
export default connect(mapStateToProps)(Header);
