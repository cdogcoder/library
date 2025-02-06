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
libraryTable.appendChild(newBookLog)