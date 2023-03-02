// variables
let myLibrary = [];

// examples for test
const harryPotter = new Book('Harry Potter', 'J. K. Rowling', 223, true);
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

myLibrary.push(harryPotter);
myLibrary.push(theHobbit);

const addBtn = document.querySelector('.add');
const form = document.querySelector('form');
const popup = document.querySelector('.popup');
const cardsContainer = document.querySelector('.cards-container');

// eventListener
addBtn.addEventListener('click', () => {
  popup.classList.add('show');
});

window.addEventListener('DOMContentLoaded', displayAllBook);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs = e.target.querySelectorAll('input');
  const book = returnNewBookObj(inputs);

  //add obj to myLibrary
  myLibrary.push(book);

  //display this book on the screen
  displayEachBook(book);

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

function returnNewBookObj(inputs) {
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
  //make input as Book obj
  return new Book(title, author, pages, read);
}

function displayAllBook() {
  //as soon as add a book, display the all books
  if (myLibrary.length === 0) {
    //myLibrary is empty
    return;
  } else {
    myLibrary.forEach((book) => {
      displayEachBook(book);
    });
  }
}

function displayEachBook({ title, author, pages, read }) {
  //display single book

  //make as single card
  const card = document.createElement('article');
  card.classList.add('card');
  //write down the content into card element
  card.innerHTML = `<h2 class="title">${title}</h2>
    <h3 class="author">${author}</h3>
    <p class="pages">${pages}</p>
    <p class="read">${read}</p>
    <button class="remove">Remove</button>`;
  //add to test box
  cardsContainer.appendChild(card);

  //attach removeBtn addEventListener each card
  const removeBtn = card.querySelector('.remove');

  removeBtn.addEventListener('click', removeBook);
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

function removeBook(e) {
  console.log(e.target);

  //remove book from myLibrary
  //remove card element on the screen
}
