import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getAllTags } from '../../actions/tags';
import { getAllArticlesByTag } from '../../actions/articles';
import { store } from '../../store';
import {
  FETCHING,
  FETCH_ERROR,
  FETCH_OK,
} from '../../constants/fetchingStatus';
export const Tags = props => {
  const { tags } = props;
  const [fetchingStatus, setFetchingStatus] = useState(FETCHING);
  const tagsArray = Object.values(tags);
  useEffect(() => {
    store
      .dispatch(getAllTags())
      .then(() => {
        setFetchingStatus(FETCH_OK);
      })
      .catch(err => {
        setFetchingStatus(FETCH_ERROR);
        throw err;
      });
  }, []);

  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular tags</p>
        {fetchingStatus === FETCHING && <p>Loading...</p>}
        {fetchingStatus === FETCH_ERROR && <p>Tags are failed to load !</p>}
        {fetchingStatus === FETCH_OK && tags.length === 0 && (
          <p>No tags yet !</p>
        )}
        {tags &&
          tagsArray.map((tag, index) => {
            const handleClick = tag => {
              store.dispatch(getAllArticlesByTag(tag));
            };
            return (
              <a
                onClick={e => handleClick(e)}
                key={index}
                href="/"
                className="tag-default tag-pill"
              >
                {tag}
              </a>
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tags: state.tags,
  };
};
export default connect(mapStateToProps)(Tags);
