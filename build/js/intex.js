"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("myModal");
const bookForm = document.getElementById("bookForm");
const bookContent = document.getElementById("bookContent");
function openModal() {
    modal.classList.add("modalOpen");
}
function closeModal() {
    modal.classList.remove("modalOpen");
}
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
const bookList = JSON.parse(localStorage.getItem("bookList") || "[]");
class Book {
    bookId;
    bookName;
    bookAuthor;
    bookGenre;
    bookImage;
    bookPrice;
    bookStock;
    bookStatus;
    constructor(bookName, bookAuthor, bookGenre, bookImage, bookPrice, bookStock) {
        this.bookId = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.bookGenre = bookGenre;
        this.bookImage = bookImage;
        this.bookPrice = bookPrice;
        this.bookStock = bookStock;
        this.bookStatus = bookStock > 0 ? "In Stock" : "Out of Stock";
    }
    addToBookList() {
        bookList.push(this);
        localStorage.setItem("bookList", JSON.stringify(bookList));
    }
}
class Render {
    renderBookList(bookList) {
        if (bookList.length === 0)
            return (bookContent.innerHTML = "No books found");
        while (bookContent.firstChild) {
            bookContent.removeChild(bookContent.firstChild);
        }
        bookList.forEach((book) => {
            const bookElement = document.createElement("div");
            bookElement.innerHTML = `
       <div class="max-w-sm  bg-gray-800 rounded-lg overflow-hidden transition-transform shadow-2xl border border-gray-300 hover:scale-102 hover:shadow-3xl">
        
        <div class="w-full overflow-hidden">
          <img src="${book.bookImage}" alt="Book Image" class="w-full h-[250px] object-cover">        
        </div>

        <div class="p-4">
          <h2 class="text-xl font-bold mb-1">${book.bookName}</h2>
          <p class="text-gray-400 mb-1">Author: <span class="text-gray-200">${book.bookAuthor}</span></p>
          <p class="text-gray-400 mb-1">Genre: <span class="text-gray-200 capitalize">${book.bookGenre}</span></p>
          <p class="text-gray-400 mb-1">Price: <span class="text-gray-200">$${book.bookPrice.toFixed(2)}</span></p>
          <p class="text-gray-400 mb-1">Stock: <span class="text-gray-200">${book.bookStock}</span></p>
          <p class="text-gray-400 mb-3">Status: <span class="text-green-400" id="bookStatus">${book.bookStatus}</span></p>
    

          
          <div data-id="${book.bookId}" class="flex gap-3 w-full">
          <button ${book.bookStock === 0 ? "disabled" : ""} id="sellBtn" class="bg-blue-500 text-white py-2  w-full rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Sell</button>
          <button class="bg-yellow-500 text-white py-2  w-full rounded-lg shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">Edit</button>
          <button id="deleteBtn" class="bg-red-500 text-white py-2  w-full rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Delete</button>
          </div>
        </div>
      </div>
    
    `;
            bookContent.appendChild(bookElement);
        });
    }
}
const render = new Render();
const handleDeleteBook = (e) => {
    const element = e.target;
    switch (element.id) {
        case "deleteBtn":
            const bookId = element.parentElement?.dataset.id;
            const book = bookList.find((book) => book.bookId === bookId);
            if (!book)
                return;
            const userAgreeToDelete = confirm(`Are you sure you want to delete ${book.bookName}?`);
            if (userAgreeToDelete) {
                const index = bookList.findIndex((book) => book.bookId === bookId);
                bookList.splice(index, 1);
                localStorage.setItem("bookList", JSON.stringify(bookList));
                render.renderBookList(bookList);
            }
            break;
        case "sellBtn":
            const bookSellId = element.parentElement?.dataset.id;
            const bookSell = bookList.find((book) => book.bookId === bookSellId);
            if (!bookSell)
                return;
            if (bookSell.bookStock > 0) {
                bookSell.bookStock -= 1;
                bookSell.bookStatus =
                    bookSell.bookStock > 0 ? "In Stock" : "Out of Stock";
                localStorage.setItem("bookList", JSON.stringify(bookList));
                render.renderBookList(bookList);
            }
            break;
    }
};
bookContent.addEventListener("click", handleDeleteBook);
const handleCreateBook = (e) => {
    e.preventDefault();
    const inputs = bookForm.querySelectorAll("input , select");
    const values = Array.from(inputs).map((input) => {
        const inputElement = input;
        if (inputElement.type === "number") {
            return Number(inputElement.value);
        }
        return inputElement.value;
    });
    const newBook = new Book(...values);
    console.log(newBook);
    newBook.addToBookList();
    render.renderBookList(bookList);
    closeModal();
    bookForm.reset();
};
bookForm.addEventListener("submit", handleCreateBook);
render.renderBookList(bookList);
