const libraryTable = document.querySelector("table");
const books = [];

function Book(bookTitle, author, pages, readStatus) {
    this.bookTitle = bookTitle;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

const bookEntry = new Book("Harry Potter and the Sorcerer's Stone", "JK Rowling", 230, "Read");
    
const newBookTitle = document.createElement("td");
const newBookAuthor = document.createElement("td");
const newBookPages = document.createElement("td");
const newBookReadStatus = document.createElement("td");

newBookTitle.textContent = bookEntry.bookTitle;
newBookAuthor.textContent = bookEntry.author;
newBookPages.textContent = bookEntry.pages;
newBookReadStatus.textContent = bookEntry.readStatus;

const newBookLog = document.createElement("tr");
newBookLog.appendChild(newBookTitle)
newBookLog.appendChild(newBookAuthor)
newBookLog.appendChild(newBookPages)
newBookLog.appendChild(newBookReadStatus)
books.push(newBookLog)

function addBookToLibrary(bookTitle, author, pages, readStatus) {
    const bookEntry = new Book(bookTitle, author, pages, readStatus);
    
    const newBookTitle = document.createElement("td");
    const newBookAuthor = document.createElement("td");
    const newBookPages = document.createElement("td");
    const newBookReadStatus = document.createElement("td");

    newBookTitle.textContent = bookEntry.bookTitle;
    newBookAuthor.textContent = bookEntry.author;
    newBookPages.textContent = bookEntry.pages;
    newBookReadStatus.textContent = bookEntry.readStatus;

    const newBookLog = document.createElement("tr");
    newBookLog.appendChild(newBookTitle);
    newBookLog.appendChild(newBookAuthor);
    newBookLog.appendChild(newBookPages);
    newBookLog.appendChild(newBookReadStatus);
    books.push(newBookLog);
    
}

addBookToLibrary("Harry Potter and the Chamber of Secrets", "JK Rowling", 200, "Read");

const addNewBookButton = document.querySelector(".add-book-button");
const dialog = document.querySelector("dialog");

addNewBookButton.addEventListener("click", () => {
    dialog.showModal();
})

const bookTitleInput = document.querySelector("form input[id='book-title']");
const authorInput = document.querySelector("form input[id='author']");
const pagesInput = document.querySelector("form input[id='pages']");
const readStatusInput = document.querySelector("form input[id='read-status']");
const addBookEntryButton = document.querySelector("form button");

addBookEntryButton.addEventListener("click", () => {
    addBookToLibrary(bookTitleInput.value, authorInput.value, pagesInput.value, readStatusInput.value);
    for (book of books) {
        libraryTable.appendChild(book);
    }
})