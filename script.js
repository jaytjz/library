const myLibrary = [];
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

class Books {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
        this.index = null;
    }
}

function addBookToLibrary(book) {
  book.index = myLibrary.length;
  myLibrary.push(book)
  console.log(book.index);
}

function updateDisplay(library) {
    const container = document.querySelector(".container");
    container.innerHTML = "";

    for (let book of library){
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <p><strong>Title:</strong> ${book.title}</p>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Read Status:</strong> ${book.readStatus}</p>
        <button id="del-btn" data-index="${book.index}">Delete</button>
        <button id="change-read-status" data-index="${book.index}">Change Read Status</button>
        `;

        container.appendChild(card);
    }
}

document.getElementById("submit-btn").addEventListener("click", (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const readStatus = document.querySelector('input[name="read-status"]:checked').value;

    if (!title || !author || !pages) {
        alert("Please fill out all required fields: Title, Author, Pages");
        return;
    }

    const newBook = new Book(title, author, pages, readStatus);
    addBookToLibrary(newBook);
    updateDisplay(myLibrary);
    dialog.close();
});

document.body.addEventListener("click", (event) => {
    if (event.target && event.target.id === "del-btn") {
        const index = event.target.dataset.index
        console.log(index);
        console.log("Delete button clicked");
        myLibrary.splice(index,1);
    }

    if (event.target && event.target.id === "change-read-status") {
        const index = event.target.dataset.index
        const book = myLibrary[index]
        console.log(book.readStatus);
        if (book.readStatus === "Read") {
            book.readStatus = "Not Read";
        } 
        else{
            book.readStatus = "Read";
        }
    }

    updateDisplay(myLibrary);
});

addBookToLibrary(new Book("s","s","d","Read"));
updateDisplay(myLibrary);

