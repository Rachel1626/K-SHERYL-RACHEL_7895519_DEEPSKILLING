import React from 'react';

function CourseList() {
  const courses = [
    { id: 1, name: 'React Fundamentals', duration: '6 weeks' },
    { id: 2, name: 'Advanced JavaScript', duration: '8 weeks' },
    { id: 3, name: 'Node.js Backend', duration: '5 weeks' },
  ];

  if (courses.length === 0) {
    return <p>No courses available.</p>;
  }

  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id}>
          <strong>{course.name}</strong> - Duration: {course.duration}
        </li>
      ))}
    </ul>
  );
}

export default CourseList;
