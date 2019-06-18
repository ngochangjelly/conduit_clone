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
    <div className="setting-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign In</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>
            {fetchingStatus === FETCHING && (
              <p className="text-xs-center">Loading...</p>
            )}
            {fetchingStatus === FETCH_ERROR && (
              <ul className="error-messages">
                <li>email or password is invalid</li>
              </ul>
            )}
            <Form
              onSubmit={values => handleSubmit(values)}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <Field
                      name="username"
                      component="input"
                      type="text"
                      placeholder="Username"
                      required
                      className="form-control"
                    />
                  </div>
                  <div>
                    <Field
                      name="password"
                      component="input"
                      type="password"
                      placeholder="Password"
                      required
                      className="form-control"
                    />
                  </div>
                  <br />
                  <div className="buttons">
                    <button
                      href="/"
                      type="submit"
                      disabled={submitting || pristine}
                      className="btn btn-lg btn-primary pull-xs-right"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Login);
