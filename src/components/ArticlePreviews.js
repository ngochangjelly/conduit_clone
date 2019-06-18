import React from 'react';
import { connect } from 'react-redux';

import { toggleLikeArticle } from '../actions/articles';
import Pagination from './Pagination';
import ArticlePreview from './ArticlePreview';
import { FETCHING, FETCH_ERROR } from '../constants/fetchingStatus';

const ArticlePreviews = props => {
  const { articles, articlesCount, currentUser, fetchingStatus } = props;
  const onToggleLike = article => {
    toggleLikeArticle(article.slug, article.favorited)
      .then(res => {
        const newArticles = articles.map(i =>
          i.slug === res.slug ? Object.assign({}, i, res) : i,
        );
        props.setArticles(newArticles);
      })
      .catch(err => {
        throw err;
      });
  };
  if (fetchingStatus === FETCHING)
    return <div className="article-preview">Loading...</div>;
  if (fetchingStatus === FETCH_ERROR)
    return <div className="article-preview">Articles are failed to load !</div>;
  return (
    articles &&
    articles.length > 0 && (
      <div>
        {articles.map((article, key) => {
          return (
            <ArticlePreview
              key={key}
              currentUser={currentUser}
              article={article}
              onToggleLike={onToggleLike}
            />
          );
        })}
        <Pagination articlesCount={articlesCount} />
      </div>
    )
  );
};
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};
export default connect(mapStateToProps)(ArticlePreviews);
