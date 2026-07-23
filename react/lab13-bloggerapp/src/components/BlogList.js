import React from 'react';

function BlogList() {
  const blogs = [
    { id: 1, title: 'Getting Started with React', category: 'Technology' },
    { id: 2, title: 'Top 10 Travel Destinations', category: 'Travel' },
    { id: 3, title: 'Healthy Cooking Tips', category: 'Food' },
  ];

  if (blogs.length === 0) {
    return <p>No blogs available.</p>;
  }

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <strong>{blog.title}</strong> [{blog.category}]
        </li>
      ))}
    </ul>
  );
}

export default BlogList;
