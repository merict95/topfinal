const getTotalBooksCount = (books) => books.length;

const getTotalAccountsCount = (accounts) => accounts.length;

const getBooksBorrowedCount = (books) => books.filter((book) => !book.borrows[0].returned).length;

const incrementGenreCount = (acc, genre) => {
  acc[genre] ? acc[genre] += 1 : acc[genre] = 1;
  return acc;
}

const getMostCommonGenres = (books) => {
  const genreCount = books.reduce((acc, book) => incrementGenreCount(acc, book.genre), {});

  const sortedGenres = Object.entries(genreCount).sort((genreA, genreB) => genreB[1] - genreA[1]);

  return sortedGenres.slice(0, 5).map(([name, count]) => ({ name, count }));
}

const getMostPopularBooks = (books) => {
  const popularityCount = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));

  return popularityCount.sort((bookA, bookB) => bookB.count - bookA.count).slice(0, 5);
}

const getMostPopularAuthors = (books, authors) => {
  const authorCount = authors.reduce((acc, author) => {
    const { id, name } = author;
    const authorBooks = books.filter((book) => book.authorId === id);
    const borrowCount = authorBooks.reduce((sum, book) => sum + book.borrows.length, 0);
    acc.push({ name: `${name.first} ${name.last}`, count: borrowCount });
    return acc;
  }, []);

  return authorCount.sort((authorA, authorB) => authorB.count - authorA.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
