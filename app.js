// variables
let myLibrary = [];

// examples for test
const harryPotter = new Book('Harry Potter', 'J. K. Rowling', 223, true);
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

myLibrary.push(harryPotter);
myLibrary.push(theHobbit);

const test = document.querySelector('.test');
const addBtn = document.querySelector('.add');
const form = document.querySelector('form');

// eventListener
addBtn.addEventListener('click', addBookToLibrary);
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs = e.target.querySelectorAll('input');
  let title;
  let author;
  let pages;
  let read;

  inputs.forEach((input) => {
    const inputId = input.id;

    switch (inputId) {
      case 'title':
        title = input.value;
        break;
      case 'author':
        author = input.value;
        break;
      case 'pages':
        pages = input.value;
        break;
      case 'read':
        read = input.checked;
        break;
    }
  });

  //using inputs, make Book obj
  addBookToLibrary(title, author, pages, read);

  //clear the inputs
  clearInput(inputs);
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

function addBookToLibrary(title, author, pages, read) {
  //--push book into myLibrary array--

  //make input as Book obj
  const book = new Book(title, author, pages, read);

  //add obj to myLibrary
  myLibrary.push(book);

  //display this book on the screen
  displayEachBook(book);
}

function displayAllBook() {
  //as soon as add a book, display the all books
  myLibrary.forEach((book) => {
    displayEachBook(book);
  });
}

function displayEachBook({ title, author, pages, read }) {
  //display single book

  //make as single card
  const card = document.createElement('article');
  card.classList.add('card');
  //write down the content into card element
  card.textContent = `title: ${title}, author: ${author}, pages: ${pages}, read: ${read}`;
  //add to test box
  test.appendChild(card);
}

function clearInput(inputs) {
  inputs.forEach((input) => {
    if (input.id === 'read') {
      input.checked = false;
    } else {
      input.value = '';
    }
  });
}

window.addEventListener('DOMContentLoaded', displayAllBook);
