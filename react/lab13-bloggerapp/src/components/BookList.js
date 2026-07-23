import React from 'react';

function BookList() {
  const books = [
    { id: 1, title: 'React in Action', author: 'Mark Tielens Thomas' },
    { id: 2, title: 'Learning React', author: 'Eve Porcello' },
    { id: 3, title: 'The Road to React', author: 'Robin Wieruch' },
  ];

  if (books.length === 0) {
    return <p>No books available.</p>;
  }

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <strong>{book.title}</strong> by {book.author}
        </li>
      ))}
    </ul>
  );
}

export default BookList;
