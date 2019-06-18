import { Link } from 'react-router-dom';
import React from 'react';
import { FaTrash } from 'react-icons/fa';

const Comment = props => {
  const { article, comment, currentUser } = props;
  const show = `${currentUser &&
    currentUser.username === comment.author.username}`;
  return (
    comment && (
      <div className="card">
        <div className="card-block">
          <p className="card-text">{comment.body}</p>
        </div>
        <div className="card-footer">
          <Link to={`/@${comment.author.username}`} className="comment-author">
            <img
              src={comment.author.image}
              className="comment-author-img"
              alt={comment.author.username}
            />
          </Link>
          &nbsp;
          <Link to={`/@${comment.author.username}`} className="comment-author">
            {comment.author.username}
          </Link>
          <span className="date-posted">
            {new Date(comment.createdAt).toDateString()}
          </span>
          {currentUser && currentUser.username === comment.author.username && (
            <button
              onClick={() => props.onClick(article.slug, comment.id)}
              show={show}
              slug={props.slug}
              className="mod-options btn"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Comment;
