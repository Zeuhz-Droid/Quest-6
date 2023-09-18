const bookInput = document.querySelector(".book__input");
const btnSuggest = document.querySelector(".btn-suggest");
const booksContainer = document.querySelector(".books");
const favoritesNum = document.querySelector(".favorites-number");

// let isLoading = false;

class BookInfo {
  constructor(title, author, read = false) {
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

class Favorites {
  constructor() {
    this.books = [];
  }

  addBook(booKinfo) {
    this.books.push(booKinfo);
  }

  removeBook(booKinfo) {
    this.books.push(booKinfo);
  }
}

class App {
  #isLoading;

  constructor(input, btn, booksContainer, favoritesEl) {
    this.#isLoading = false;

    this.input = input;
    this.btn = btn;
    this.booksContainer = booksContainer;
    this.favoritesEl = favoritesEl;

    this.favorites = new Favorites();

    this.btn.addEventListener("click", this.getBooksData);

    document.addEventListener("click", this.addBookToFavorite);
  }

  getBooksData = async () => {
    let books;

    if (!this.input.value) return;

    if (this.#isLoading) this.btn.setAttribute("disabled", "true");

    books = await this.getBookSuggestions(this.input.value);

    this.booksContainer.innerHTML = "";

    this.input.value = "";

    books.map((book) => this.createBookElement(book));

    this.#isLoading = false;
  };

  shortenWordsLength(words, length) {
    return words
      ? words?.split(" ").splice(0, length).join(" ") +
          (words?.split(" ").length > length ? "..." : "")
      : "N/A";
  }

  addBookToFavorite = (e) => {
    if (!e.target.classList.contains("btn-favorite")) return;

    this.favoritesEl.classList.remove("added");

    const book = e.target.closest(".book");

    const title = book.querySelector(".book-titleName").innerText;
    const author = book.querySelector(".book-author").innerText;
    const read = book.querySelector(".read input").checked;

    const bookInfo = new BookInfo(title, author, read);

    this.favorites.addBook(bookInfo);

    this.favoritesEl.textContent = `${
      Number(this.favoritesEl.textContent) + 1
    }`;

    this.favoritesEl.classList.add("added");

    e.target.setAttribute("disabled", "true");
  };

  getBookSuggestions = async (query, searchBy) => {
    let search_by;

    switch (searchBy) {
      case "title":
        search_by = "title";
        break;
      case "author":
        search_by = "author";
        break;
      case "publisher":
        search_by = "publisher";
        break;
      case "subject":
        search_by = "subject";
        break;
      default:
        search_by = "q";
        break;
    }

    const link = `https://openlibrary.org/search.json?${search_by}=${query}&fields=*,availability&limit=15`;

    try {
      this.#isLoading = true;
      const res = await fetch(link);
      const data = await res.json();
      return data.docs;
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      console.log("Thank you for using Bookie");
    }
  };

  createBookElement = async (book) => {
    console.log(book);
    const html = `
      <div class="book">
          <img src="${
            `https://covers.openlibrary.org/b/isbn/${book.isbn?.[0][0]}-M.jpg` ||
            "N/A"
          }" alt="${book.title_sort}" />
        <div class="book-info">
          <p class="book-titleName">${this.shortenWordsLength(
            book.title,
            10
          )}</p>
          <div class="book-author">
            <span>author:</span>
            ${book.author_name?.[0] || "N/A"}
          </div>
          <div class="read">
              <label for="read-${book.ia_box_id?.[0]}">read</label>
              <input type="checkbox" id="read-${book.ia_box_id?.[0]}" />
          </div>
          <div class="book-subject">
              <span>subject:</span>
              ${
                book.subject
                  ? book.subject?.splice(0, 10).join(",") + "."
                  : "N/A"
              }
          </div>
          <button type="button" class="btn btn-favorite">
              Add to favorite
          </button>
          </div>
  `;

    this.booksContainer.insertAdjacentHTML("beforeend", html);
  };
}

const app = new App(bookInput, btnSuggest, booksContainer, favoritesNum);
