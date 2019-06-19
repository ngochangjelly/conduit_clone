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
    <div className="flex justify-center sm:px-8 sm:px-8 md:px-16 py-8">
      <div className="sm:w-3/4 md:w-3/4 lg:w-1/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="flex justify-center text-lg text-gray-600 font-bold pb-4">
          Your Settings
        </p>
        {currentUser && <SettingsForm currentUser={currentUser} />}
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
          <div className="mb-4">
            <Field
              name="image"
              component="input"
              type="text"
              placeholder="URL of profile picture"
              className="text-sm text-gray-600 text-sm appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              rows="8"
            />
          </div>
          <div className="mb-4">
            <Field
              name="username"
              component="input"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-600 text-sm appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              rows="8"
            />
          </div>

          <div className="mb-4">
            <Field
              name="bio"
              component="input"
              type="textarea"
              placeholder="Short bio about you"
              className="text-sm text-gray-600 text-sm appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              rows="8"
            />
          </div>
          <div className="mb-4">
            <Field
              name="email"
              component="input"
              type="email"
              placeholder="Email"
              className="text-sm text-gray-600 text-sm appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              rows="8"
            />
          </div>
          <div className="mb-4">
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="New Password"
              className="text-sm text-gray-600 text-sm appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              rows="8"
            />
          </div>
          <div className="flex justify-between">
            <button
              className="text-sm bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              href="/"
              type="submit"
              disabled={submitting}
            >
              Submit
            </button>
            <button onClick={logout} className="text-gray-600 text-sm">
              Or click <span className="font-bold text-red-500">here</span> to
              logout.
            </button>
          </div>
        </form>
      )}
    />
  );
};
