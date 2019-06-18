import React from 'react';
import { Link } from 'react-router-dom';
const ArticleDetail = props => {
  const { article } = props;
  return (
    article &&
    article.length > 0 && (
      <div className="article-meta">
        <Link to={`/${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>
        <div className="info">
          <Link to={`/${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>
      </div>
    )
  );
};

export default ArticleDetail;
