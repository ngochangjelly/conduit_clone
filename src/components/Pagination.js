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
    <nav>
      <ul className="pagination">
        {pageRange.map(page => {
          const isCurrent = page === props.currentPage;
          return (
            <li
              className={isCurrent ? 'page-item active' : 'page-item'}
              onClick={() => getAllArticles(page)}
              key={page}
            >
              <button className="page-link">{page + 1}</button>
            </li>
          );
        })}
      </ul>
    </nav>
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
