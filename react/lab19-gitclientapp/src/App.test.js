import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import GitClient from './components/GitClient';

jest.mock('axios');

describe('GitClient Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input and button', () => {
    render(<GitClient />);
    expect(screen.getByPlaceholderText('Enter GitHub username')).toBeInTheDocument();
    expect(screen.getByText('Fetch Repos')).toBeInTheDocument();
  });

  test('fetches and displays repositories', async () => {
    const mockRepos = [
      { id: 1, name: 'repo1', description: 'Test repo', stargazers_count: 10, forks_count: 5 },
      { id: 2, name: 'repo2', description: 'Another repo', stargazers_count: 20, forks_count: 8 },
    ];
    axios.get.mockResolvedValueOnce({ data: mockRepos });

    render(<GitClient />);
    fireEvent.change(screen.getByPlaceholderText('Enter GitHub username'), { target: { value: 'testuser' } });
    fireEvent.click(screen.getByText('Fetch Repos'));

    await waitFor(() => {
      expect(screen.getByText('repo1')).toBeInTheDocument();
      expect(screen.getByText('repo2')).toBeInTheDocument();
    });
    expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/testuser/repos');
  });

  test('handles API error', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(<GitClient />);
    fireEvent.change(screen.getByPlaceholderText('Enter GitHub username'), { target: { value: 'testuser' } });
    fireEvent.click(screen.getByText('Fetch Repos'));

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch repositories')).toBeInTheDocument();
    });
  });
});
