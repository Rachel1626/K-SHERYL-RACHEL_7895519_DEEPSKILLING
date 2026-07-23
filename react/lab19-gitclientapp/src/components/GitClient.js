import React, { Component } from 'react';
import axios from 'axios';

class GitClient extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', repos: [], loading: false, error: null };
  }

  fetchRepos = async () => {
    const { username } = this.state;
    if (!username) return;
    this.setState({ loading: true, error: null, repos: [] });
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      this.setState({ repos: response.data, loading: false });
    } catch (error) {
      this.setState({ error: 'Failed to fetch repositories', loading: false });
    }
  };

  render() {
    const { username, repos, loading, error } = this.state;
    return (
      <div style={{ padding: '20px' }}>
        <h2>GitHub Repository Viewer</h2>
        <div>
          <input type="text" value={username} placeholder="Enter GitHub username"
            onChange={(e) => this.setState({ username: e.target.value })}
            style={{ padding: '8px', marginRight: '10px', width: '250px' }} />
          <button onClick={this.fetchRepos} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Fetch Repos
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {repos.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {repos.map((repo) => (
              <li key={repo.id} style={{ border: '1px solid #ddd', margin: '5px 0', padding: '10px', borderRadius: '5px' }}>
                <strong>{repo.name}</strong>
                <p>{repo.description || 'No description'}</p>
                <small>Stars: {repo.stargazers_count} | Forks: {repo.forks_count}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default GitClient;
