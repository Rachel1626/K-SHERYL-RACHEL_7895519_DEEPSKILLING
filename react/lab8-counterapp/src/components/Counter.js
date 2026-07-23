import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entryCount: 0,
      exitCount: 0,
      isLoggedIn: false
    };
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  handleExit = () => {
    this.setState({ isLoggedIn: false });
  };

  incrementEntry = () => {
    this.setState((prevState) => ({ entryCount: prevState.entryCount + 1 }));
  };

  incrementExit = () => {
    this.setState((prevState) => ({ exitCount: prevState.exitCount + 1 }));
  };

  render() {
    const { entryCount, exitCount, isLoggedIn } = this.state;

    return (
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{
          padding: '15px',
          marginBottom: '20px',
          backgroundColor: isLoggedIn ? '#d4edda' : '#f8d7da',
          border: `1px solid ${isLoggedIn ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          <h2>Status: {isLoggedIn ? 'Logged In' : 'Not Logged In'}</h2>
        </div>

        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          {!isLoggedIn ? (
            <button
              onClick={this.handleLogin}
              style={{
                padding: '10px 30px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Login
            </button>
          ) : (
            <button
              onClick={this.handleExit}
              style={{
                padding: '10px 30px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Exit
            </button>
          )}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          border: '1px solid #ddd',
          borderRadius: '5px',
          padding: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h3>Entry Count</h3>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#007bff' }}>{entryCount}</p>
            <button
              onClick={this.incrementEntry}
              disabled={!isLoggedIn}
              style={{
                padding: '8px 20px',
                backgroundColor: isLoggedIn ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: isLoggedIn ? 'pointer' : 'not-allowed',
                fontSize: '14px'
              }}
            >
              + Entry
            </button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3>Exit Count</h3>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#dc3545' }}>{exitCount}</p>
            <button
              onClick={this.incrementExit}
              disabled={!isLoggedIn}
              style={{
                padding: '8px 20px',
                backgroundColor: isLoggedIn ? '#dc3545' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: isLoggedIn ? 'pointer' : 'not-allowed',
                fontSize: '14px'
              }}
            >
              + Exit
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '15px', color: '#666' }}>
          Total People Inside: {entryCount - exitCount}
        </p>
      </div>
    );
  }
}

export default Counter;
