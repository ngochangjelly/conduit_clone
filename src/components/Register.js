import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { store } from '../store';
import { register } from '../actions/auth';
const Register = props => {
  const handleSubmit = values => {
    store.dispatch(register(values));
  };
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign Up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>
            {!props.currentUser && (
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
                    <div className="form-group">
                      <Field
                        name="email"
                        component="input"
                        type="email"
                        placeholder="Email"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect()(Register);
