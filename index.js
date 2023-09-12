const bookInput = document.querySelector(".book__input");
const btnSuggest = document.querySelector(".btn-suggest");
const booksContainer = document.querySelector(".books");

const API_KEY = `AIzaSyCWrjFpNYazw620SD0AfnXx_doKXNDV5RY`;

class Library {
  constructor(title, author) {
    this.bookTitle = title;
    this.bookAuthor = author;
  }

  isWatched() {}
}

btnSuggest.addEventListener("click", () => {
  async function getBooksData() {
    let books;
    books = await getBookSuggestions(bookInput.value);

    // console.log(books);
    booksContainer.innerHTML = "";

    books.map((book) => createBookElement(book.volumeInfo));
  }
  getBooksData();
});

async function getBookSuggestions(title) {
  console.log(title);
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${API_KEY}`
    );
    const data = await res.json();
    return data.items;
  } catch (error) {
    alert("Book Not Found!");
  } finally {
    alert("Check Below!");
  }
}

function createBookElement(book) {
  const html = `
    <div class="book">
        <img src="${book.imageLinks.thumbnail}" alt="shoe1" />
        <div class="book-info">
        <p class="book-titleName">${book.title}</p>
        <span class="book-author">${book.authors?.[0] || "N/A"}</span>
        <div class="read">
            <label for="read-${book.authors?.[0] || "N/A"}">read</label>
            <input type="checkbox" id="read-${book.authors?.[0] || "N/A"}" />
        </div>
        <div class="book-description">
            <span>Description:</span>
            ${book.description}
        </div>
        <button type="button" class="btn btn-library">
            Add to Library
        </button>
        </div>
`;

  booksContainer.insertAdjacentHTML("beforeend", html);
}
