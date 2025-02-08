const libraryTableHeaderCells = document.querySelectorAll("thead tr th");
const libraryTableLog = document.querySelector("tbody");
const books = [];

function Book(bookTitle, author, pages, readStatus) {
    this.bookTitle = bookTitle;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.changeReadStatus = function (currentReadStatus) {
        this.readStatus = currentReadStatus == "Read" ? "Unread" : "Read";
    }
}

function addBookToLibrary(bookTitle, author, pages, readStatus) {
    libraryTableHeaderCells.forEach((cell) => {
        cell.style.cssText = "border-bottom: 1px solid black;"
    })
    const bookEntry = new Book(bookTitle, author, pages, readStatus);
    
    books.push(bookEntry);
    displayBookInLibraryTable(bookEntry)
}

function displayBookInLibraryTable(bookEntry) {
    const newBookTitle = document.createElement("td");
    newBookTitle.className = "book-title";
    const newBookAuthor = document.createElement("td");
    newBookAuthor.className = "author";
    const newBookPages = document.createElement("td");
    newBookPages.className = "pages";
    const newBookReadStatus = document.createElement("td");
    newBookReadStatus.className = "read-status";
    const readStatusToggleButtonContainer = document.createElement("td");
    readStatusToggleButtonContainer.className = "read-status-toggle-button-container";
    const readStatusToggleButton = document.createElement("button");
    readStatusToggleButtonContainer.appendChild(readStatusToggleButton);
    const removeBookEntryButtonContainer = document.createElement("td");
    removeBookEntryButtonContainer.className = "remove-book-entry-button-container";
    const removeBookEntryButton = document.createElement("button");
    removeBookEntryButtonContainer.appendChild(removeBookEntryButton);

    newBookTitle.textContent = bookEntry.bookTitle;
    newBookAuthor.textContent = bookEntry.author;
    newBookPages.textContent = bookEntry.pages;
    newBookReadStatus.textContent = bookEntry.readStatus;
    readStatusToggleButton.textContent = bookEntry.readStatus == "Read" ? "Toggle Unread" : "Toggle Read";
    removeBookEntryButton.textContent = "Remove";

    const newBookLog = document.createElement("tr");
    readStatusToggleButton.addEventListener("click", () => {
        bookEntry.changeReadStatus(bookEntry.readStatus);
        readStatusToggleButton.textContent = bookEntry.readStatus == "Read" ? "Toggle Unread" : "Toggle Read";
        libraryTableLog.innerHTML = "";
        books.forEach((book) => displayBookInLibraryTable(book));
    })
    removeBookEntryButton.addEventListener("click", () => {
        books.splice(books.indexOf(bookEntry), 1);
        if (books.length == 0) {
            libraryTableHeaderCells.forEach((cell) => {
                cell.style.cssText = "";
            })
        }
        libraryTableLog.innerHTML = "";
        books.forEach((book) => displayBookInLibraryTable(book));
    })
    newBookLog.appendChild(newBookTitle);
    newBookLog.appendChild(newBookAuthor);
    newBookLog.appendChild(newBookPages);
    newBookLog.appendChild(newBookReadStatus);
    newBookLog.appendChild(readStatusToggleButtonContainer);
    newBookLog.appendChild(removeBookEntryButtonContainer);
    newBookLog.childNodes.forEach(
        (cell) => {
        cell.addEventListener("mouseover", () => {
            for (node of newBookLog.childNodes) {
                node.style.cssText = "background-color: yellow;";
            }
        })
        cell.addEventListener("mouseout", () => {
            for (node of newBookLog.childNodes) {
                node.style.cssText = "background-color: white;";
            }
        })
        }
    )

    libraryTableLog.appendChild(newBookLog);
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

addBookEntryButton.addEventListener("click", (event) => {
    event.preventDefault();
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
