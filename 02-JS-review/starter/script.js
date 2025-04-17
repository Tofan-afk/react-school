const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}
/*
//Destructuring
const book = getBook(1);

const { title, author, genres, pages, publicationDate, hasMovieAdaptation } =
  book;

const [primaryGenre, secondaryGenre, ...other] = genres;
other;

//rest/spread operator
const newGenres = [...genres, "newGenre"];

const updatedBook = {
  ...book,
  moviePublicationDate: "2001-12-19",
  movieRating: 8.8,
};

//template literals
const summary = `${title} is a book`;
summary;

//ternary operator instead of if/else
const pageRange = pages > 1000 ? "over 1000 pages" : "less than 1000 pages";

//arrow functions
const getYear = (str) => str.split("-")[0];
console.log(getYear(publicationDate));
*/

//.map - run a function on each element of an array and return a new array

/*
const books = getBooks();

const titles = books.map((book) => book.title);
titles;

const essentialData = books.map((book) => {
  return {
    title: book.title,
    author: book.author,
  };
});

//.filter - create a new array with elements that pass a test (filter out elements)

const longBooksWithMovieAdaptation = books
  .filter((book) => book.pages > 500)
  .filter((book) => book.hasMovieAdaptation);
longBooksWithMovieAdaptation;

//.reduce - reduce an array to a single value (e.g., sum, average)

const totalPages = books.reduce((acc, book) => acc + book.pages, 0);
totalPages;

//.sort - sort an array based on a property, this one affects the original array

const sortedBooks = books.slice().sort((a, b) => a.pages - b.pages);
sortedBooks;

//immutable array
//1. add a book

const newBook = {
  id: 6,
  title: "The Hitchhiker's Guide to the Galaxy",
  author: "Douglas Adams",
  publicationDate: "1979-10-12",
};
const booksAfterAdd = [...books, newBook];

//2. remove a book
const booksAfterRemove = books.filter((book) => book.id !== 2);
booksAfterRemove;

//reindex the books
booksAfterRemove.map((book, i) => {
  book.id = ++i;
  return book;
});
booksAfterRemove;
*/

/*
//async promises
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

*/

//async/await
async function fetchPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

fetchPosts;
