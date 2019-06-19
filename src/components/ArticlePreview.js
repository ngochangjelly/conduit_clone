import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
const ArticlePreview = props => {
  const { article, currentUser } = props;
  const createdDate = new Date(article.createdAt);
  return (
    <div className="block my-4">
      <div className="flex">
        <div className="flex w-10/12 mb-2">
          <img
            className="rounded-full h-10 w-10"
            alt=""
            src={article.author.image}
          />
          <div className="flex flex-wrap">
            <a
              className="w-full text-sm text-green-600 pl-2"
              href={`/@${article.author.username}`}
              username={article.author.username}
            >
              {article.author.username}
            </a>
            <span className="w-full text-sm text-gray-500 pl-2">
              {createdDate.toDateString()}
            </span>
          </div>
        </div>
        <button
          className={
            article.favorited
              ? 'float-right text-sm bg-green-600 text-white border border-green-500 rounded inline-flex items-center px-2 my-1'
              : 'float-right text-sm text-green-600 hover:text-white hover:bg-green-500 border border-green-500 rounded inline-flex items-center px-2 my-1'
          }
          disabled={!currentUser}
          onClick={() => props.onToggleLike(article)}
        >
          <FaHeart /> <div className="pl-1">{article.favoritesCount}</div>
        </button>
      </div>
      <div className="w-full border-b-2 border-gray-200 pb-4">
        <Link to={`/article/${article.slug}`}>
          <h1 className="text-sm text-gray-700 font-bold">{article.title}</h1>
          <p className="text-gray-500 text-sm">{article.description}</p>
          <span className="text-gray-500 text-sm">Read more</span>
          {article.tagList && (
            <ul className="flex flex-wrap text-right">
              {article.tagList.map(tag => {
                return (
                  <li
                    key={tag}
                    className=" hover:bg-gray-200 text-gray-500 text-xs py-2 px-4 rounded-full border border-gray-400"
                  >
                    {tag}
                  </li>
                );
              })}
            </ul>
          )}
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};
export default connect(mapStateToProps)(ArticlePreview);
