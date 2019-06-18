import React from 'react';
import { Form, Field } from 'react-final-form';

import { createArticle } from '../actions/articles';
import { store } from '../store';
const PostComposer = props => {
  const handleSubmit = values => {
    store.dispatch(createArticle(values));
  };
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
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
                      name="title"
                      component="input"
                      type="text"
                      placeholder="Article Title"
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="description"
                      component="input"
                      type="text"
                      placeholder="What's this title about?"
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="body"
                      component="textarea"
                      type="text"
                      placeholder="Write your article (in markdown)"
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="tags"
                      component="input"
                      type="text"
                      placeholder="Enter Tags"
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
                      Publish Article
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

export default PostComposer;
