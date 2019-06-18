import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
const ArticlePreview = props => {
  const { article, currentUser } = props;

  return (
    <div className="article-preview">
      <div className="article-meta">
        <img alt="" src={article.author.image} />
        <div className="info">
          <a
            href={`/@${article.author.username}`}
            username={article.author.username}
            className="author ng-binding"
          >
            {article.author.username}
          </a>
          <span className="date ng-binding">{article.author.createdAt}</span>
        </div>
        <div className="pull-xs-right">
          <button
            className={
              article.favorited
                ? 'btn btn-sm btn-outline-primary-favored'
                : 'btn btn-sm btn-outline-primary'
            }
            disabled={!currentUser}
            onClick={() => props.onToggleLike(article)}
          >
            <FaHeart /> {article.favoritesCount}
          </button>
        </div>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1 className="article-meta">{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more</span>
        {article.tagList && (
          <ul className="tag-list">
            {article.tagList.map(tag => {
              return (
                <li key={tag} className="tag-default tag-pill tag-outline">
                  {tag}
                </li>
              );
            })}
          </ul>
        )}
      </Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};
export default connect(mapStateToProps)(ArticlePreview);
