import React from 'react';
import styles from './CohortTracker.module.css';

const cohorts = [
  { id: 1, name: 'Cohort 2023-A', status: 'Completed' },
  { id: 2, name: 'Cohort 2024-A', status: 'Ongoing' },
  { id: 3, name: 'Cohort 2024-B', status: 'Completed' },
  { id: 4, name: 'Cohort 2025-A', status: 'Ongoing' },
  { id: 5, name: 'Cohort 2025-B', status: 'Upcoming' },
];

function CohortTracker() {
  return (
    <div className={styles.container}>
      <h2>Cohort List</h2>
      <ul className={styles.list}>
        {cohorts.map((cohort) => (
          <li
            key={cohort.id}
            className={`${styles.listItem} ${
              cohort.status === 'Ongoing'
                ? styles.ongoing
                : cohort.status === 'Completed'
                ? styles.completed
                : styles.upcoming
            }`}
          >
            <span className={styles.name}>{cohort.name}</span>
            <span className={styles.status}>{cohort.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CohortTracker;
