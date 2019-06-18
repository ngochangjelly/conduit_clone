import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';

import { store } from '../store';
import { logout, updateUser } from '../actions/auth';

import history from '../constants/history';
var diff = require('deep-object-diff').diff;

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};
const Settings = props => {
  const { currentUser } = props;
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            {currentUser && <SettingsForm currentUser={currentUser} />}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">
              <hr />
              <button onClick={logout} className="btn btn-outline-danger">
                Or click here to logout.
              </button>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(mapStateToProps)(Settings);

const SettingsForm = props => {
  const { currentUser } = props;
  const initialValues = {
    image: `${currentUser.image}`,
    username: `${currentUser.username}`,
    bio: `${currentUser.bio}`,
    email: `${currentUser.email}`,
  };
  const handleSubmit = values => {
    let changedProfileFields = diff(initialValues, values);
    if (
      Object.entries(changedProfileFields).length === 0 &&
      changedProfileFields.constructor === Object
    ) {
      history.push('/');
    }
    return store.dispatch(updateUser(changedProfileFields));
  };
  return (
    <Form
      onSubmit={values => handleSubmit(values)}
      initialValues={initialValues}
      render={({ handleSubmit, form, submitting, values }) => (
        <form onSubmit={values => handleSubmit(values)}>
          <div className="form-group">
            <Field
              name="image"
              component="input"
              type="text"
              placeholder="URL of profile picture"
              className="form-control form-control-lg"
              rows="8"
            />
          </div>
          <div className="form-group">
            <Field
              name="username"
              component="input"
              type="text"
              placeholder="Username"
              className="form-control form-control-lg"
              rows="8"
            />
          </div>

          <div className="form-group">
            <Field
              name="bio"
              component="input"
              type="textarea"
              placeholder="Short bio about you"
              className="form-control form-control-lg"
              rows="8"
            />
          </div>
          <div className="form-group">
            <Field
              name="email"
              component="input"
              type="email"
              placeholder="Email"
              className="form-control form-control-lg"
              rows="8"
            />
          </div>
          <div className="form-group">
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="New Password"
              className="form-control form-control-lg"
              rows="8"
            />
          </div>
          <div className="buttons">
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              href="/"
              type="submit"
              disabled={submitting}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    />
  );
};
