import React from 'react';
import { Form, Field } from 'react-final-form';

import { createArticle } from '../actions/articles';
import { store } from '../store';
const PostComposer = props => {
  const handleSubmit = values => {
    store.dispatch(createArticle(values));
  };
  return (
    <div className="flex justify-center sm:px-8 sm:px-8 md:px-16 py-8">
      <div className="sm:w-10/12 md:w-10/12 lg:w-2/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="col-md-10 offset-md-1 col-xs-12">
          <Form
            onSubmit={values => handleSubmit(values)}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Field
                    name="title"
                    component="input"
                    type="text"
                    placeholder="Article Title"
                    required
                    className="text-sm text-gray-600 text-sm appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    name="description"
                    component="input"
                    type="text"
                    placeholder="What's this title about?"
                    required
                    className="text-sm text-gray-600 text-sm appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    name="body"
                    component="textarea"
                    type="text"
                    placeholder="Write your article (in markdown)"
                    required
                    className="text-sm text-gray-600 text-sm appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    name="tags"
                    component="input"
                    type="text"
                    placeholder="Enter Tags"
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
                    Publish Article
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
