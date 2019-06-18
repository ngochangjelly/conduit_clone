import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CommentComposer from './CommentComposer';
import Comments from './Comments';
import {
  getCommentsByArticle,
  postComment,
  removeComment,
} from '../../actions/comments';

const CommentSection = props => {
  const { article, currentUser } = props;
  const handleSubmit = values => {
    return postComment(article.slug, values.comment)
      .then(res => {
        setComments([res, ...comments]);
      })
      .catch(err => {
        throw err;
      });
  };
  const onClick = (articleID, commentID) => {
    removeComment(articleID, commentID)
      .then(res => {
        let updatedComments = comments.filter(comment => comment.id !== res);
        setComments(updatedComments);
      })
      .catch(err => {
        throw err;
      });
  };

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (article) {
      getCommentsByArticle(article.slug)
        .then(res => {
          setComments(res);
        })
        .catch(err => {
          throw err;
        });
    }
  }, [article.slug, article]);

  return (
    comments && (
      <div>
        {currentUser ? (
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <div>
                <CommentComposer
                  handleSubmit={handleSubmit}
                  article={article}
                  currentUser={currentUser}
                />
              </div>
              <Comments
                comments={comments}
                article={article}
                currentUser={currentUser}
                onClick={onClick}
              />
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <p>
                <Link to="/login">Sign in</Link> or{' '}
                <Link to="/register"> sign up </Link> to add comments on this
                article.
              </p>
              <Comments article={article} comments={comments} />
            </div>
          </div>
        )}
      </div>
    )
  );
};
export default connect()(CommentSection);
