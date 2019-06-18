import React from 'react';

import Comment from './Comment';

const Comments = props => {
  const { article, comments, currentUser } = props;
  return (
    <div>
      {comments &&
        comments.map((comment, key) => {
          return (
            <Comment
              onClick={props.onClick}
              comment={comment}
              currentUser={currentUser}
              article={article}
              key={key}
            />
          );
        })}
    </div>
  );
};

export default Comments;
