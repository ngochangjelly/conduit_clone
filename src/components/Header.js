import React from 'react';
import { FaEdit, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const Header = props => {
  const { currentUser } = props;
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          {!currentUser && (
            <li className="nav-item">
              <LoggedoutHeader />
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <LoggedinHeader currentUser={currentUser} />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
const LoggedoutHeader = props => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Sign in
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign up
        </Link>
      </li>
    </ul>
  );
};
const LoggedinHeader = props => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={`/editor`}>
          <FaEdit /> New Post
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={`/settings`}>
          <FaCog /> Settings
        </Link>
      </li>
      <li className="nav-item">
        <Link to={`/@${props.currentUser.username}`} className="nav-link">
          <img
            src={props.currentUser.image}
            className="user-pic"
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
