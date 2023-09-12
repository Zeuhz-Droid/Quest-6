const bookInput = document.querySelector(".book__input");
const btnSuggest = document.querySelector(".btn-suggest");
const booksContainer = document.querySelector(".books");
const favoritesNum = document.querySelector(".favorites-number");

let isLoading = false;

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

const favorites = new Favorites();

document.addEventListener("click", addBookToFavorite);

btnSuggest.addEventListener("click", () => {
  async function getBooksData() {
    let books;

    if (!bookInput.value) return;

    if (isLoading) btnSuggest.setAttribute("disabled", "true");

    books = await getBookSuggestions(bookInput.value);

    // console.log(books);
    booksContainer.innerHTML = "";

    bookInput.value = "";

    books.map((book) => createBookElement(book.volumeInfo));

    isLoading = false;
  }
  getBooksData();
});

function addBookToFavorite(e) {
  if (!e.target.classList.contains("btn-favorite")) return;

  favoritesNum.classList.remove("added");

  const book = e.target.closest(".book");

  const title = book.querySelector(".book-titleName").innerText;
  const author = book.querySelector(".book-author").innerText;
  const read = book.querySelector(".read input").checked;

  const bookInfo = new BookInfo(title, author, read);

  favorites.addBook(bookInfo);

  favoritesNum.textContent = `${Number(favoritesNum.textContent) + 1}`;

  favoritesNum.classList.add("added");

  e.target.setAttribute("disabled", "true");
}

async function getBookSuggestions(query, searchBy) {
  let link;

  switch (searchBy) {
    case "title":
      link = `https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}&key=${API_KEY}`;
      break;
    case "author":
      link = `https://www.googleapis.com/books/v1/volumes?q=${query}+inauthor:${query}&key=${API_KEY}`;
      break;
    case "publisher":
      link = `https://www.googleapis.com/books/v1/volumes?q=${query}+inpublisher:${query}&key=${API_KEY}`;
      break;
    case "subject":
      link = `https://www.googleapis.com/books/v1/volumes?q=${query}+subject:${query}&key=${API_KEY}`;
      break;
    case "isbn":
      link = `https://www.googleapis.com/books/v1/volumes?q=${query}+isbn:${query}&key=${API_KEY}`;
      break;
    case "lccn":
      link = `https://www.googleapis.com/books/v1/volumes?q=${query}+lccn:${query}&key=${API_KEY}`;
      break;
    default:
      link = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`;
      break;
  }

  try {
    isLoading = true;
    const res = await fetch(link);
    const data = await res.json();
    return data.items;
  } catch (error) {
    alert("Book Not Found!");
  } finally {
    // alert("Check Below!");
  }
}

function createBookElement(book) {
  const html = `
    <div class="book">
        <img src="${book.imageLinks.thumbnail}" alt="shoe1" />
        <div class="book-info">
        <p class="book-titleName">${shortenWordsLength(book.title, 10)}</p>
        <span class="book-author">${book.authors?.[0] || "N/A"}</span>
        <div class="read">
            <label for="read-${book.authors?.[0] || "N/A"}">read</label>
            <input type="checkbox" id="read-${book.authors?.[0] || "N/A"}" />
        </div>
        <div class="book-description">
            <span>Description:</span>
            ${shortenWordsLength(book.description, 51)}
        </div>
        <button type="button" class="btn btn-favorite">
            Add to favorite
        </button>
        </div>
`;

  booksContainer.insertAdjacentHTML("beforeend", html);
}

function shortenWordsLength(words, length) {
  return words
    ? words?.split(" ").splice(0, length).join(" ") +
        (words?.split(" ").length > length ? "..." : "")
    : "N/A";
}
