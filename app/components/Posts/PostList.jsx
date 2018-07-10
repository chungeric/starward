import React from 'react';
import { BLOG_SLUG } from '../../config/app';
import { Categories } from './Categories';
import { PostListItem } from './PostListItem';
import { Pagination } from './Pagination';

export const PostList = props => {
  const {
    posts,
    currentPage,
    urlBase = BLOG_SLUG
  } = props;
  const { items, categories } = posts;
  if (!items || items.length < 1) {
    return <h3>No Posts Found</h3>;
  }
  const samePagePagination = true;
  return (
    <section className="posts">
      <Categories categories={categories} />
      <section className="posts_list">
        {items.length < 1 ? <h2>No Posts Found</h2> : null}
        {items.map((post, index) => <PostListItem key={index} {...post} />)}
      </section>
      <Pagination
        posts={posts}
        currentPage={currentPage}
        urlBase={urlBase}
      />
    </section>
  );
};
