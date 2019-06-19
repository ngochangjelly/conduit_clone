import { connect } from 'react-redux';

import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';
import { GLOBAL_FEED, YOUR_FEED } from '../../constants/tabName';
import {
  getAllArticles,
  getUserFavoritedArticles,
} from '../../actions/articles';
import {
  FETCHING,
  FETCH_OK,
  FETCH_ERROR,
} from '../../constants/fetchingStatus';

const Home = props => {
  const { currentUser } = props;
  const [currentTab, setCurrentTab] = useState(GLOBAL_FEED);
  const [fetchingStatus, setFetchingStatus] = useState(FETCHING);
  const [articles, setArticles] = useState(FETCHING);
  const [articlesCount, setArticlesCount] = useState(undefined);

  useEffect(() => {
    if (currentTab === GLOBAL_FEED) {
      getAllArticles(currentUser)
        .then(res => {
          setArticles(res.articles);
          setArticlesCount(res.articlesCount);
          setFetchingStatus(FETCH_OK);
        })
        .catch(err => {
          setFetchingStatus(FETCH_ERROR);
          throw err;
        });
    }
    if (currentUser && currentTab === YOUR_FEED) {
      getUserFavoritedArticles(currentUser.username)
        .then(res => {
          setArticles(res.articles);
          setArticlesCount(res.articlesCount);
          setFetchingStatus(FETCH_OK);
        })
        .catch(() => {
          setFetchingStatus(FETCH_ERROR);
        });
    }
  }, [currentTab, currentUser]);

  return (
    <div className="flex flex-wrap sm:px-8 md:px-32 lg:px-32">
      {!props.currentUser && <Banner />}
      <div className="sm:w-full md:w-full lg:w-3/4">
        <MainView
          articles={articles}
          articlesCount={articlesCount}
          setCurrentTab={setCurrentTab}
          fetchingStatus={fetchingStatus}
          currentTab={currentTab}
          setArticles={setArticles}
        />
      </div>
      <div className="bg-gray-100 h-full xs:w-full sm:w-full md:w-full lg:w-1/4">
        <Tags />
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};
export default connect(mapStateToProps)(Home);
