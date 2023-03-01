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
  //   const testBook = new Book(title, author, pages, read);
  //   console.log(testBook);
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

  //take user input using prompt
  //  take title, author, pages, read
  //   const title = prompt('title');
  //   const author = prompt('author');
  //   const pages = prompt('pages');
  //   const read = prompt('read');

  //make input as Book obj
  const book = new Book(title, author, pages, read);

  //add obj to myLibrary
  myLibrary.push(book);
  console.log(myLibrary);
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

function clearInput(inputs) {
  inputs.forEach((input) => {
    if (input.id === 'read') {
      input.checked = false;
    } else {
      input.value = '';
    }
  });
}
