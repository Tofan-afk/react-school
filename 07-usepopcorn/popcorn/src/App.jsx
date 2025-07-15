import { useState, useEffect } from "react";
import StarRating from "./StarRating";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function MoviesList({ movies, setId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieComponent movie={movie} key={movie.imdbID} setId={setId} />
      ))}
    </ul>
  );
}

function MovieComponent({ movie, setId }) {
  return (
    <li
      key={movie.imdbID}
      onClick={() => {
        setId(movie.imdbID);
      }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedList({ watched, setWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieComponent
          movie={movie}
          key={movie.imdbID}
          setWatched={setWatched}
        />
      ))}
    </ul>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieComponent({ movie, setWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() =>
            setWatched((x) => x.filter((y) => y.imdbID !== movie.imdbID))
          }
        >
          X
        </button>
      </div>
    </li>
  );
}

function SelectedMovie({
  selectedID,
  setSelectedID,
  setError,
  setWatched,
  watched,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: director,
    Genre: genre,
    Released: released,
  } = movieDetails;

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );

        // Check if the response is ok
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();

        // Check if the response is valid
        if (data.Response === "False") {
          throw new Error(data.Error || "Failed to fetch movie details");
        }

        // If the response is valid, set the movie details
        console.log(data);
        setMovieDetails(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchMovieDetails();
  }, [selectedID]);

  useEffect(() => {
    if (!title) return; // Avoid setting title if title is not available
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn"; // Reset title when component unmounts
    };
  }, [title]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setSelectedID(null); // Close the details view when Escape is pressed
      }
    });

    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setSelectedID(null); // Clean up the event listener
        }
      });
    };
  }, [setSelectedID]);

  function handleAddToWatched() {
    const movieToAdd = {
      imdbID: selectedID,
      title: title,
      year: year,
      poster: poster,
      imdbRating: parseFloat(imdbRating),
      userRating: userRating,
      runtime: parseInt(runtime, 10),
    };

    // Check if the movie is already in the watched list
    const isAlreadyWatched = watched.some(
      (movie) => movie.imdbID === selectedID
    );

    if (isAlreadyWatched) {
      setError("Movie is already in your watched list.");
      return;
    }

    setWatched((prev) => [...prev, movieToAdd]);
    setSelectedID(null); // Close the details view after adding
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button
              className="btn-back"
              onClick={() => {
                setSelectedID(null);
              }}
            >
              &larr;
            </button>
            <img src={poster} alt={`${title} poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section className="details-plot">
            <div className="rating">
              <StarRating
                maxRating={10}
                color="#fcc419"
                size={24}
                defaultRating={0}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button
                  className="btn-add"
                  onClick={() => handleAddToWatched()}
                >
                  Add to list
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>
              Directed by <strong>{director}</strong>
            </p>
          </section>
        </>
      )}
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function Error({ message }) {
  return <p className="error">Error: {message}</p>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function NavBar({ movies, query, setQuery }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
}

const KEY = "44f470cd";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedID, setSelectedID] = useState(null);
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError(null); // Reset error state
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal } // Using query for search
        );

        // Check if the response is ok
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();

        // Check if the response is valid
        if (data.Response === "False") {
          throw new Error(data.Error || "Failed to fetch movies");
        }

        // Check if the Search array is empty
        if (data.Search === undefined || data.Search.length === 0) {
          throw new Error("No movies found");
        }

        // If the response is valid, set the movies
        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        if (err.name === "AbortError") {
          setError(""); // Ignore the error if the fetch was aborted
          return; // Ignore the error if the fetch was aborted
        }
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]); // Reset movies if query is empty
      setError(""); // Reset error state
      setIsLoading(false); // Reset loading state
      return;
    }

    fetchMovies();
    return () => {
      controller.abort(); // Clean up the fetch request on unmount or query change
    };
  }, [query]); // Fetch movies whenever query changes

  return (
    <>
      <NavBar movies={movies} query={query} setQuery={setQuery} />
      <main className="main">
        <Box>
          {isLoading && <Loader />}
          {error && <Error message={error} />}
          {!isLoading && !error && (
            <MoviesList movies={movies} setId={setSelectedID} />
          )}
        </Box>
        {selectedID ? (
          <Box>
            <SelectedMovie
              selectedID={selectedID}
              setSelectedID={setSelectedID}
              setError={setError}
              setWatched={setWatched}
              watched={watched}
            />
          </Box>
        ) : (
          <Box>
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} setWatched={setWatched} />
            </>
          </Box>
        )}
      </main>
    </>
  );
}
