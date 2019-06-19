import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaHashtag } from 'react-icons/fa';

import ArticlePreviews from '../ArticlePreviews';
import { GLOBAL_FEED, YOUR_FEED, TAG_FILTER } from '../../constants/tabName';

const MainView = props => {
  const {
    currentUser,
    fetchingStatus,
    articles,
    articlesCount,
    currentTab,
  } = props;

  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <ul className="mt-4 inline-flex">
          {currentUser && (
            <YourFeedTab
              currentTab={currentTab}
              setCurrentTab={props.setCurrentTab}
            />
          )}
          <GlobalFeedTab
            currentTab={currentTab}
            setCurrentTab={props.setCurrentTab}
          />
          <ArticlesFilterByTag
            currentTab={currentTab}
            setCurrentTab={props.setCurrentTab}
          />
        </ul>
      </div>
      {articles && articlesCount && (
        <div className="w-full">
          <ArticlePreviews
            articlesCount={articlesCount}
            articles={articles}
            fetchingStatus={fetchingStatus}
            setArticles={props.setArticles}
          />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};
const YourFeedTab = props => {
  const [currentTab] = useState(YOUR_FEED);
  const handleClick = e => {
    props.setCurrentTab(currentTab);
  };
  return (
    <li className="mr-10 text-gray-500 text-lg font-bold ">
      <button
        name="your-feed"
        onClick={e => handleClick(e)}
        className={
          props.currentTab === currentTab
            ? 'inline-flex text-sm text-green-600 hover:text-green-600'
            : 'inline-flex text-sm text-gray-500 hover:text-green-600'
        }
      >
        Your Feed
      </button>
    </li>
  );
};
const GlobalFeedTab = props => {
  const [currentTab] = useState(GLOBAL_FEED);
  const handleClick = e => {
    e.preventDefault();
    props.setCurrentTab(currentTab);
  };
  return (
    <li className="flex-inline mr-10">
      <button
        name="global-feed"
        onClick={e => handleClick(e)}
        className={
          props.currentTab === currentTab
            ? 'text-sm text-green-600'
            : 'text-sm text-gray-500'
        }
      >
        Global Feed
      </button>
    </li>
  );
};

const ArticlesFilterByTag = props => {
  if (!props.tag) {
    return null;
  }
  const currentTab = TAG_FILTER;
  return (
    <li>
      <button
        className={
          props.currentTab === currentTab
            ? 'text-lg font-bold text-green-600'
            : 'text-lg font-bold text-gray-500'
        }
      >
        <FaHashtag />
        {props.tag}
      </button>
    </li>
  );
};

export default connect(mapStateToProps)(MainView);
