# Introduction

The Bookie App

## Use Case

Suggest books based on genre, title, authors, publishers and so on...

## Languages

- JavaScript
- HTML
- CSS3

## Paradigm

- Object Oriented Programming (OOP)

## MANDATORY STATEMENTS/CODES

### Switch Statement

- The Switch statement: Used to select the choice of search of the user, before a query is made. The collect the user's category of search either by the author of book, title, publisher and so on. This value is then inserted into a link, before book suggestions are fetched and loaded to the DOM.

```JavaScript
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
```

### Try/Catch Statement

- The Try and Catch Statement is used to fetch book suggestions from Google Book API. The data is sorted after which the required content rendered on DOM.

```JavaScript
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

```

### Classes Code

- The OOP method was the coding paradigm for this site, and the class Object below shows a private class, construcator function initializing some event listeners and storing some DOM arguments as properties.

```JavaScript

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
}
```

## Contributor

Zeuhz
