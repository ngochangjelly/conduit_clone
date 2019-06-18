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
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
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
        <ArticlePreviews
          articlesCount={articlesCount}
          articles={articles}
          fetchingStatus={fetchingStatus}
          setArticles={props.setArticles}
        />
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
    <li className="nav-item">
      <button
        name="your-feed"
        onClick={e => handleClick(e)}
        className={
          props.currentTab === currentTab ? 'nav-link active' : 'nav-link'
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
    <li className="nav-item">
      <button
        name="global-feed"
        onClick={e => handleClick(e)}
        className={
          props.currentTab === currentTab ? 'nav-link active' : 'nav-link'
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
    <li className="nav-item">
      <button
        className={
          props.currentTab === currentTab ? 'nav-link active' : 'nav-link'
        }
      >
        <FaHashtag />
        {props.tag}
      </button>
    </li>
  );
};

export default connect(mapStateToProps)(MainView);
