import React, { Component } from 'react';

class FetchUserApp extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: true, error: null };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch('https://api.randomuser.me');
      if (!response.ok) throw new Error('Failed to fetch user');
      const data = await response.json();
      this.setState({ user: data.results[0], loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  render() {
    const { user, loading, error } = this.state;
    return (
      <div style={{ padding: '20px' }}>
        <h2>Random User</h2>
        <button onClick={this.fetchUser} style={{ padding: '10px 20px', marginBottom: '20px', cursor: 'pointer' }}>
          Fetch Next User
        </button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {user && (
          <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', maxWidth: '300px' }}>
            <img src={user.picture.medium} alt={user.name.first} style={{ borderRadius: '50%' }} />
            <h3>{user.name.title} {user.name.first} {user.name.last}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Location:</strong> {user.location.city}, {user.location.country}</p>
          </div>
        )}
      </div>
    );
  }
}

export default FetchUserApp;
