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
const test = document.querySelector('.test');
const displayAllBtn = document.querySelector('.displayAllBooks');

function displayAllBook() {
  //as soon as add a book, display the all books
  myLibrary.forEach((book) => {
    const { title, author, pages, read } = book;
    //make as single card
    const card = document.createElement('article');
    card.classList.add('card');
    //write down the content into card element
    card.textContent = `title: ${title}, author: ${author}, pages: ${pages}, read: ${read}`;
    //add to test box
    test.appendChild(card);
  });
}

const addBtn = document.querySelector('.add');

addBtn.addEventListener('click', addBookToLibrary);
displayAllBtn.addEventListener('click', displayAllBook);
