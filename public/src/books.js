// Helper function: Check if a book is returned
const isBookReturned = (book) => {
  return book.borrows[0].returned;
};

// Function: Find author by ID
function findAuthorById(authors, authorId) {
  return authors.find((author) => author.id === authorId);
}

// Function: Find book by ID
function findBookById(books, bookId) {
  return books.find((book) => book.id === bookId);
}

//  Partition books by borrowed status
function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.filter((book) => !isBookReturned(book));
  const returnedBooks = books.filter((book) => isBookReturned(book));
  return [borrowedBooks, returnedBooks];
}

// Get borrowers for a book
function getBorrowersForBook(book, accounts) {
  const borrowers = [];
  for (const borrow of book.borrows) {
    const accountId = borrow.id;
    const isReturned = borrow.returned;
    const account = accounts.find((acc) => acc.id === accountId);
    if (account) {
      const borrower = {
        id: accountId,
        returned: isReturned,
        ...account
      };
      borrowers.push(borrower);
    }
  }
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
