// variables
let myLibrary = [];

//class constructor
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = getUniqueId();
  }
  info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}
// examples for test
const harryPotter = new Book('Harry Potter', 'J. K. Rowling', 223, true);
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

myLibrary.push(harryPotter);
myLibrary.push(theHobbit);

const addBtn = document.querySelector('.add-btn');
const form = document.querySelector('form');
const popup = document.querySelector('.popup');
const cardsContainer = document.querySelector('.cards-container');

// eventListener
addBtn.addEventListener('click', () => {
  controlFormShow();
});
const cancelBtn = document.querySelector('.cancel-btn');

cancelBtn.addEventListener('click', () => {
  const inputs = [...document.querySelectorAll('input')];
  clearInput(inputs);
  controlFormShow(false);
  //remove event listener for memory leak??? I don't know
});

window.addEventListener('DOMContentLoaded', displayAllBook);

form.addEventListener('input', (e) => {
  //each time the user type something, we check if the form field is valid
  //check the input the user is typing
  checkDataValidity(e);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  //check form validation and add book
  //check all inputs
  //if one of inputs are not valid -> report message here
  checkformValidity(e);
  // setBook(e.target);
});

function checkDataValidity(e) {
  const input = e.target;
  const error = input.nextElementSibling;
  if (!input.validity.valid) {
    //if input is invalid, display error msg
    error.textContent = input.validationMessage;
  } else if (input.validity.valid && error) {
    //if input is valid remove error msg
    error.textContent = '';
  }
}
function checkformValidity(e) {
  const inputs = [...document.querySelectorAll('input')];
  let invalidInputs = inputs.filter((input) => {
    if (!input.validity.valid) {
      return input;
    }
  });

  if (invalidInputs.length === 0) {
    setBook(e.currentTarget);
  } else {
    invalidInputs.forEach((input) => {
      input.reportValidity();
    });
  }
}

function setBook(formSubmitted) {
  const inputs = formSubmitted.querySelectorAll('input');

  //make new obj using input value
  const book = returnNewBookObj(inputs);

  //add obj to myLibrary
  myLibrary.push(book);

  //display this book on the screen
  displaySingleBook(book);

  //clear the inputs
  clearInput(inputs);

  //close form
  controlFormShow(false);
}

function controlFormShow(show = true) {
  if (show) {
    popup.classList.add('show');
  } else if (!show) {
    popup.classList.remove('show');
  }
}

function returnNewBookObj(inputs) {
  let title;
  let author;
  let pages;
  let read;

  //using inputs, make Book obj
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

  //make input as Book obj
  return new Book(title, author, pages, read);
}

function displayAllBook() {
  //as soon as add a book, display the all books

  if (myLibrary.length === 0) {
    //if myLibrary is empty, get out of this function
    return;
  }

  myLibrary.forEach((book) => {
    displaySingleBook(book);
  });
}

function displaySingleBook({ id, title, author, pages, read }) {
  //display single book

  //make as single card
  const card = document.createElement('article');
  card.classList.add('card');
  card.setAttribute('id', id);
  //write down the content into card element
  //format card
  card.innerHTML = `<button class="remove">
  <i class="fa-solid fa-xmark"></i>
  </button>
  <h2 class="book-title">${title}</h2>
  <h3 class="author">${author}</h3>
  <p class="pages">${pages}</p>
  ${
    read
      ? `<button class="status read">read</button>`
      : `<button class="status">not read yet</button>`
  }`;
  //add to cardsContainer
  cardsContainer.appendChild(card);

  //attach removeBtn addEventListener each card
  const removeBtn = card.querySelector('.remove');
  const statusBtn = card.querySelector('.status');

  removeBtn.addEventListener('click', removeBook);
  statusBtn.addEventListener('click', changeStatus);
}

function removeBook(e) {
  //using target, get the element to be removed
  const removedElementId = Number(e.currentTarget.parentElement.id);
  //find the element in myLibrary variable
  //delete all child and add again
  myLibrary = myLibrary.filter((book) => {
    if (book.id !== removedElementId) {
      return book;
    }
  });

  //clean the cards container
  cardsContainer.innerHTML = ``;
  //display myLibrary again
  displayAllBook();
}

//make this as prototype
function changeStatus(e) {
  const card = e.currentTarget.parentElement;
  const elementId = Number(e.currentTarget.parentElement.id);
  //find the element in myLibrary array
  myLibrary.forEach((book) => {
    if (book.id === elementId) {
      //modify read status
      book.read ? (book.read = false) : (book.read = true);
    }
  });

  //display only that element again
  //do not display whole again
  const cardStatus = card.querySelector('.status');

  cardStatus.classList.toggle('read');

  if (cardStatus.textContent === 'read') {
    cardStatus.textContent = 'not read yet';
  } else {
    cardStatus.textContent = 'read';
  }
}

function getUniqueId() {
  return new Date().getTime() + Math.floor(Math.random() * 1000);
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
