import React, { useState, useEffect } from 'react';
import FollowButtonToggle from './FollowButtonToggle';
import { connect } from 'react-redux';
import axios from 'axios';
import { FaCog } from 'react-icons/fa';

import { baseUrl } from '../../constants/baseUrl';
import history from '../../constants/history';
import { getProfile } from '../../actions/profile';
import { getArticlesByAuthor } from '../../actions/articles';
import ArticlePreviews from '../../components/ArticlePreviews';
import { GLOBAL_FEED } from '../../constants/tabName';
import {
  FETCHING,
  FETCH_OK,
  FETCH_ERROR,
} from '../../constants/fetchingStatus';

const Profile = props => {
  const { currentUser } = props;
  const [profile, setProfile] = useState({});
  const [articles, setArticles] = useState({});
  const [articlesCount, setArticlesCount] = useState({});
  const [fetchingStatus, setFetchingStatus] = useState(FETCHING);

  useEffect(() => {
    getProfile(props.match.params.id)
      .then(res => {
        setProfile(res);
      })
      .catch(err => {
        throw err;
      });
    getArticlesByAuthor(props.match.params.id)
      .then(res => {
        setArticles(res.articles);
        setArticlesCount(res.articlesCount);
        setFetchingStatus(FETCH_OK);
      })
      .catch(err => {
        setFetchingStatus(FETCH_ERROR);
        throw err;
      });
  }, [props.match.params.id]);

  const handleClick = following => {
    following
      ? axios.delete(`${baseUrl}/profiles/${profile.username}/follow`).then()
      : axios.post(`${baseUrl}/profiles/${profile.username}/follow`).then();
  };

  return (
    <div className="sm:px-8 sm:px-8 md:px-32 lg:px-32 py-4">
      <div className="bg-gray-200 text-gray-600">
        {profile && (
          <div className="flex flex-wrap">
            <div className="flex justify-center items-center">
              <img
                src={profile.image}
                className="h-16 w-16 rounded-full"
                alt={profile.username}
              />
            </div>
            <h4 className="w-full flex justify-center font-bold">
              {profile.username}
            </h4>
            <p className="w-full flex justify-center">{profile.bio}</p>

            {currentUser && currentUser.username === profile.username ? (
              <button
                className="w-full flex justify-center"
                onClick={() => history.push('/settings')}
              >
                <FaCog className="inline-flex" />
                Edit Profile Settings
              </button>
            ) : (
              <FollowButtonToggle
                handleClick={handleClick}
                currentUser={currentUser}
                profile={profile}
              />
            )}
          </div>
        )}
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            {articles && (
              <ArticlePreviews
                articles={articles}
                articlesCount={articlesCount}
                fetchingStatus={fetchingStatus}
                currentTab={GLOBAL_FEED}
                setArticles={setArticles}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    articles: state.articles,
    articlesCount: state.articlesCount,
  };
};
export default connect(mapStateToProps)(Profile);
