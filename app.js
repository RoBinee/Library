let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

function addBookToLibrary() {
  //--push book into myLibrary array--

  //take user input using prompt
  //  take title, author, pages, read
  const title = prompt('title');
  const author = prompt('author');
  const pages = prompt('pages');
  const read = prompt('read');

  //make input as Book obj
  const book = new Book(title, author, pages, read);

  //add obj to myLibrary
  myLibrary.push(book);
}

function displayAllBooks() {
  //--display each book on page--
}
