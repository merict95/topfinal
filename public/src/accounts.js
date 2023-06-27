const isBookBorrowedByAccount = (account, book) => {
  const accountId = account.id;
  return book.borrows.some(borrow => borrow.id === accountId);
}
// filter thru accounts by ID
const findAccountById = (accounts, id) => accounts.find(account => account.id === id);
//filter thru accounts by Last name
const sortAccountsByLastName = (accounts) => {
  return accounts.sort((account1, account2) => {
    const lastNameAccount1 = account1.name.last.toLowerCase();
    const lastNameAccount2 = account2.name.last.toLowerCase();
    if (lastNameAccount1 < lastNameAccount2) {
      return -1;
    }
    if (lastNameAccount1 > lastNameAccount2) {
      return 1;
    }
    return 0;
  });
}

const getTotalNumberOfBorrows = (account, books) => {
  let totalBorrows = 0;
  for (const book of books) {
    if (isBookBorrowedByAccount(account, book)) {
      totalBorrows++;
    }
  }
  return totalBorrows;
}

const getBooksPossessedByAccount = (account, books, authors) => {
  const checkedOutBooks = [];
  for (const book of books) {
    const isBookCheckedOut = book.borrows.some((borrow) => borrow.id === account.id && !borrow.returned);
    if (isBookCheckedOut) {
      const author = authors.find((author) => author.id === book.authorId);
      const bookWithAuthor = { ...book, author };
      checkedOutBooks.push(bookWithAuthor);
    }
  }
  return checkedOutBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
