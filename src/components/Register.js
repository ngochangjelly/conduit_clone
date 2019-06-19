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
    <div className="flex justify-center sm:px-8 sm:px-8 md:px-16 py-8">
      <div className="sm:w-3/4 md:w-3/4 lg:w-1/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="flex justify-center text-lg text-gray-600 font-bold pb-4">
          Sign Up
        </h1>
        <p className="flex justify-center text-sm text-gray-600 pb-4">
          <Link to="/login">Already have an account?</Link>
        </p>
        {!props.currentUser && (
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
                    name="email"
                    component="input"
                    type="email"
                    placeholder="Email"
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
                <div className="flex justify-center">
                  <button
                    href="/"
                    type="submit"
                    disabled={submitting || pristine}
                    className="text-sm bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
  );
};

export default connect()(Register);
