import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';

import CommentSection from './CommentSection';
import ArticleDetail from './ArticleDetail';
import { getArticleByID } from '../../actions/articles';

const Article = props => {
  const { id } = props.match.params;
  const { currentUser } = props;

  const [article, setArticle] = useState({});
  useEffect(() => {
    getArticleByID(id)
      .then(res => {
        setArticle(res);
      })
      .catch(err => {
        setArticle({});
        throw err;
      });
  }, [id]);
  return (
    article && (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>
            <ArticleDetail article={article} />
          </div>
        </div>
        <div className="container page">
          <div className="row article-content">
            {article.body}
            <div className="col-xs-12">
              <ul className="tag-list">
                {article.tagList &&
                  article.tagList.map((tag, key) => {
                    return (
                      <li
                        className="tag-default tag-pill tag-outline"
                        key={tag}
                      >
                        {tag}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <hr />
          <div className="article-actions" />
          <CommentSection article={article} currentUser={currentUser} />
        </div>
      </div>
    )
  );
};
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps)(Article);
