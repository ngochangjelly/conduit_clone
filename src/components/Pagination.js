import React from 'react';
import { connect } from 'react-redux';

import { getAllArticles } from '../actions/articles';

const Pagination = props => {
  if (props.articlesCount <= 10) {
    return null;
  }
  const pageRange = [];
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
    pageRange.push(i);
  }

  return (
    <ul className="inline-flex flex-wrap mb-4">
      {pageRange.map(page => {
        const isCurrent = page === props.currentPage;
        return (
          <li
            className={isCurrent ? 'bg-green-500' : ''}
            onClick={() => getAllArticles(page)}
            key={page}
          >
            <button
              className={
                isCurrent
                  ? 'text-gray-500 bg-green-500 text-sm font-bold py-2 px-4 rounded'
                  : 'bg-gray-100 hover:bg-green-500 hover:text-white text-gray-500 text-sm font-bold py-2 px-4 rounded'
              }
            >
              {page + 1}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
const mapStateToProps = state => {
  return {
    currentPage: state.currentPage,
  };
};
export default connect(
  mapStateToProps,
  null,
)(Pagination);
