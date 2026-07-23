import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import CohortDetails from './components/CohortDetails';

describe('CohortDetails Component', () => {
  test('renders cohort details correctly', () => {
    render(<CohortDetails name="Cohort 2024" status="Ongoing" students={30} />);
    expect(screen.getByText('Cohort 2024')).toBeInTheDocument();
    expect(screen.getByText('Ongoing')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  test('renders default props', () => {
    render(<CohortDetails />);
    expect(screen.getByText('Default Cohort')).toBeInTheDocument();
    expect(screen.getByText('Upcoming')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { container } = render(<CohortDetails name="Test Cohort" status="Completed" students={25} />);
    expect(container).toMatchSnapshot();
  });

  test('shows green color for Ongoing status', () => {
    render(<CohortDetails name="Test" status="Ongoing" students={10} />);
    const statusSpan = screen.getByText('Ongoing');
    expect(statusSpan).toHaveStyle({ color: 'green' });
  });

  test('shows blue color for Completed status', () => {
    render(<CohortDetails name="Test" status="Completed" students={10} />);
    const statusSpan = screen.getByText('Completed');
    expect(statusSpan).toHaveStyle({ color: 'blue' });
  });
});

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });
});
