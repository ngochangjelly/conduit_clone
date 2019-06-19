import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';

import { login } from '../actions/auth';
import { store } from '../store';
import { FETCHING, FETCH_ERROR } from '../constants/fetchingStatus';

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};
const Login = props => {
  const [fetchingStatus, setFetchingStatus] = useState(undefined);
  const handleSubmit = values => {
    setFetchingStatus(FETCHING);
    return store.dispatch(login(values)).catch(err => {
      setFetchingStatus(FETCH_ERROR);
      throw err;
    });
  };
  return (
    <div className="flex justify-center sm:px-8 sm:px-8 md:px-16 py-8">
      <div className="sm:w-3/4 md:w-3/4 lg:w-1/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="flex justify-center text-lg text-gray-600 font-bold pb-4">
          Sign In
        </h1>
        <p className="flex justify-center text-sm text-gray-600 pb-4">
          <Link to="/register">Need an account?</Link>
        </p>
        {fetchingStatus === FETCHING && (
          <p className="text-gray-600 text-sm">Loading...</p>
        )}
        {fetchingStatus === FETCH_ERROR && (
          <ul className="text-gray-600 text-sm">
            <li>email or password is invalid</li>
          </ul>
        )}
        <Form
          onSubmit={values => handleSubmit(values)}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Field
                  name="username"
                  component="input"
                  type="text"
                  placeholder="Username"
                  required
                  className="text-sm text-gray-600 text-sm appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <Field
                  name="password"
                  component="input"
                  type="password"
                  placeholder="Password"
                  required
                  className="text-sm text-gray-600 text-sm appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <br />
              <button
                href="/"
                type="submit"
                disabled={submitting || pristine}
                className="text-sm bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Login);
