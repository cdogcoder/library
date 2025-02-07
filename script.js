const libraryTable = document.querySelector("table");
const books = [];

function Book(bookTitle, author, pages, readStatus) {
    this.bookTitle = bookTitle;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

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

const addNewBookButton = document.querySelector(".add-book-button");
const dialog = document.querySelector("dialog");

addNewBookButton.addEventListener("click", () => {
    dialog.showModal();
})

const bookTitleInput = document.querySelector("form input[id='book-title']");
const authorInput = document.querySelector("form input[id='author']");
const pagesInput = document.querySelector("form input[id='pages']");
const readStatusRadios = document.querySelectorAll("form input[type='radio']");
const addBookEntryButton = document.querySelector("form button:last-child");
const cancelBookEntryButton = document.querySelector("form button:first-child")

addBookEntryButton.addEventListener("click", () => {
    let radioCheckedValue = "";
    for (radio of readStatusRadios) {
        if (radio.checked && radio.id == "read") {
            radioCheckedValue = "Read";
        } 
        else if (radio.checked && radio.id == "unread") {
            radioCheckedValue = "Unread";
        }
    }
    if (bookTitleInput.value && authorInput.value && pagesInput.value && radioCheckedValue) {
        addBookToLibrary(bookTitleInput.value, authorInput.value, pagesInput.value, radioCheckedValue);
        bookTitleInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
        readStatusRadios.forEach((radio) => radio.checked = false);
        dialog.close();
    }
    for (book of books) {
        libraryTable.appendChild(book);
    }
})

cancelBookEntryButton.addEventListener("click", () => {
    dialog.close();
})

dialog.addEventListener("click", (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        dialog.close();
    }
})
