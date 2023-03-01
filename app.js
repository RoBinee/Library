// variables
let myLibrary = [];

const test = document.querySelector('.test');
const displayAllBtn = document.querySelector('.displayAllBooks');
const addBtn = document.querySelector('.add');
const form = document.querySelector('form');

// eventListener
addBtn.addEventListener('click', addBookToLibrary);
displayAllBtn.addEventListener('click', displayAllBook);
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs = e.target.querySelectorAll('input');
  let title;
  let author;
  let pages;
  let read;

  inputs.forEach((input) => {
    const inputValue = input.value;
    const inputId = input.id;

    switch (inputId) {
      case 'title':
        title = inputValue;
        break;
      case 'author':
        author = inputValue;
        break;
      case 'pages':
        pages = inputValue;
        break;
      case 'read':
        read = inputValue;
        break;
    }
  });
  const testBook = new Book(title, author, pages, read);
  console.log(testBook);
  //using inputs, make Book obj
});

// function
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
