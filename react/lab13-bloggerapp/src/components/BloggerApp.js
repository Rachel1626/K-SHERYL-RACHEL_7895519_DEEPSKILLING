import React from 'react';
import BookList from './BookList';
import BlogList from './BlogList';
import CourseList from './CourseList';

function BloggerApp() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Blogger App</h1>
      <h2>Books</h2>
      <BookList />
      <h2>Blogs</h2>
      <BlogList />
      <h2>Courses</h2>
      <CourseList />
    </div>
  );
}

export default BloggerApp;
