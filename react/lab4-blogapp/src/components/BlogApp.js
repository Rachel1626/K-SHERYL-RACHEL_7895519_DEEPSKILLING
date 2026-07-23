import React, { Component } from 'react';

class BlogApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ posts: data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  }

  componentDidCatch(error, errorInfo) {
    console.error('BlogApp caught an error:', error, errorInfo);
  }

  render() {
    const { posts, loading, error } = this.state;

    if (loading) {
      return <p>Loading posts...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    return (
      <div>
        <h2>Blog Posts</h2>
        {posts.slice(0, 10).map((post) => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default BlogApp;
