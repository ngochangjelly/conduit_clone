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
    <div className="overflow-auto relative px-4 py-4">
      <p className="px-2 text-gray-700 text-base font-bold">Popular tags</p>

      {fetchingStatus === FETCHING && (
        <p className="text-gray-500 text-sm">Loading...</p>
      )}
      {fetchingStatus === FETCH_ERROR && (
        <p className="text-gray-500 text-sm">Tags are failed to load !</p>
      )}
      {fetchingStatus === FETCH_OK && tags.length === 0 && (
        <p className="text-gray-500 text-sm">No tags yet !</p>
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
              className="mx-1 my-1 inline-flex bg-gray-500 hover:bg-gray-600 text-white text-sm py-1 px-2 rounded-full"
            >
              {tag}
            </a>
          );
        })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tags: state.tags,
  };
};
export default connect(mapStateToProps)(Tags);
