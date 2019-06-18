import React from 'react';
import { Form, Field } from 'react-final-form';

const CommentComposer = props => {
  const { currentUser } = props;
  const onSubmit = values => {
    return props.handleSubmit(values);
  };
  return (
    <div className="card comment-form ">
      <Form
        className="card-block"
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form
            onSubmit={v => {
              handleSubmit(v).then(res => {
                form.reset();
              });
            }}
          >
            <div className="card-block">
              <Field
                name="comment"
                component="textarea"
                type="text"
                placeholder="Write down your comment ..."
                rows="3"
                required
                className="form-control"
              />
            </div>
            <div className="card-footer">
              <img
                src={currentUser.image}
                className="comment-author-img"
                alt={currentUser.username}
              />
              <div className="buttons">
                <button
                  href="/"
                  type="submit"
                  disabled={submitting || pristine}
                  className="btn btn-sm btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default CommentComposer;
