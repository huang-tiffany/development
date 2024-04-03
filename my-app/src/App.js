import "./App.css";
import Card from "./components/Card";
import data from "./assets/data.json";
import { useEffect, useState } from "react";

function App() {
  const [favorites, setFavorites] = useState(new Map());
  const [favoriteMuseums, setFavoriteMuseums] = useState([]);

  const [saved, setSaved] = useState(new Map());
  const [savedMuseums, setSavedMuseums] = useState([]);

  const [filters, setFilters] = useState([]);
  const [locFilter, setLocFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [displayData, setDisplayData] = useState(data);

  const [sort, setSort] = useState("");

  const openListMenu = (button) => {
    if (button === "nav-filter") {
      document.querySelector(".filter-menu").classList.add("open");
      document.querySelector(".filters").classList.add("open");

      document.querySelector(".list-menu").classList.remove("open");
      document.querySelector(".user-lists").classList.remove("open");
    } else {
      if (button === "nav-favorite") {
        document.querySelector(".favorites-list").classList.add("open");
        document.querySelector(".saved-list").classList.remove("open");
      } else {
        document.querySelector(".favorites-list").classList.remove("open");
        document.querySelector(".saved-list").classList.add("open");
      }
      document.querySelector(".list-menu").classList.add("open");
      document.querySelector(".user-lists").classList.add("open");

      document.querySelector(".filter-menu").classList.remove("open");
      document.querySelector(".filters").classList.remove("open");
    }

    const navButtons = document.getElementsByClassName("nav-action");
    for (let i = 0; i < navButtons.length; i++) {
      navButtons[i].classList.remove("open");
    }

    document.querySelector("." + button).classList.add("open");
  };

  const closeListMenu = (button) => {
    if (button === "nav-filter") {
      document.querySelector(".filter-menu").classList.remove("open");
      document.querySelector(".filters").classList.remove("open");
    } else {
      document.querySelector(".list-menu").classList.remove("open");
      document.querySelector(".user-lists").classList.remove("open");
    }

    const navButtons = document.getElementsByClassName("nav-action");
    for (let i = 0; i < navButtons.length; i++) {
      navButtons[i].classList.remove("open");
    }
  };

  const addToFavorites = (museum) => {
    if (favorites.has(museum[5])) {
      favorites.delete(museum[5]);
      setFavorites(favorites);
      const museumCards = document.getElementsByClassName(museum[5]);
      for (let i = 0; i < museumCards.length; i++) {
        museumCards[i].classList.remove("favorited");
      }
    } else {
      setFavorites(new Map(favorites.set(museum[5], museum)));
    }

    const arr = [];
    favorites.forEach((museum) => {
      arr.push(museum);
    });

    setFavoriteMuseums(arr);
  };

  const addToSaved = (museum) => {
    if (saved.has(museum[5])) {
      saved.delete(museum[5]);
      setSaved(saved);
      const museumCards = document.getElementsByClassName(museum[5]);
      for (let i = 0; i < museumCards.length; i++) {
        museumCards[i].classList.remove("saved");
      }
    } else {
      setSaved(new Map(saved.set(museum[5], museum)));
    }

    const arr = [];
    saved.forEach((museum) => {
      arr.push(museum);
    });

    setSavedMuseums(arr);
  };

  useEffect(() => {
    addToFilters(locFilter);
  }, [locFilter]);

  useEffect(() => {
    addToFilters(genreFilter);
  }, [genreFilter]);

  const addToFilters = (entry) => {
    const filterArr = [];
    filterArr.push(locFilter);
    filterArr.push(genreFilter);

    for (let j = 0; j < filters.length; j++) {
      const elt = document.getElementById(filters[j]);
      if (elt) {
        elt.classList.remove("selected");
      }
    }

    // const for one location filter, const for one genre filter. check separately if item has both filters if they're both used
    setFilters(filterArr);
    for (let j = 0; j < filterArr.length; j++) {
      const elt = document.getElementById(filterArr[j]);
      if (elt) {
        elt.classList.add("selected");
      }
    }

    const arr = [];
    data.forEach((museum) => {
      if (genreFilter.length > 0 && locFilter.length > 0) {
        if (
          !arr.includes(museum) &&
          museum.genre === genreFilter &&
          museum.area === locFilter
        ) {
          arr.push(museum);
        }
      } else if (genreFilter.length > 0) {
        if (!arr.includes(museum) && museum.genre === genreFilter) {
          arr.push(museum);
        }
      } else if (locFilter.length > 0) {
        if (!arr.includes(museum) && museum.area === locFilter) {
          arr.push(museum);
        }
      } else {
        arr.push(museum);
      }
    });
    setDisplayData(arr);
  };

  const sortData = (toSort) => {
    if (sort === "low-to-high") {
      return toSort.sort((a, b) => a["price"] - b["price"]);
    } else if (sort === "high-to-low") {
      return toSort.sort((a, b) => (a["price"] - b["price"]) * -1);
    } else {
      return toSort.sort((a, b) => a.title.localeCompare(b.title));
    }
  };

  useEffect(() => {
    const sortButtons = document.getElementsByClassName("sort-button");
    for (let i = 0; i < sortButtons.length; i++) {
      sortButtons[i].classList.remove("selected");
    }

    const elt = document.getElementById(sort);
    if (elt) {
      elt.classList.add("selected");
    }
  }, [sort]);

  const clearFavorites = () => {
    favorites.forEach((key) => {
      const museumCards = document.getElementsByClassName(key[5]);
      for (let i = 0; i < museumCards.length; i++) {
        museumCards[i].area.remove("favorited");
      }
    });

    setFavorites(new Map());
    setFavoriteMuseums([]);
  };

  const clearSaved = () => {
    saved.forEach((key) => {
      const museumCards = document.getElementsByClassName(key[5]);
      for (let i = 0; i < museumCards.length; i++) {
        museumCards[i].classList.remove("saved");
      }
    });

    setSaved(new Map());
    setSavedMuseums([]);
  };

  const clearFilters = () => {
    setSort("");
    setGenreFilter("");
    setLocFilter("");
  };

  useEffect(() => {
    favorites.forEach((key) => {
      const museumCards = document.getElementsByClassName(key[5]);
      for (let i = 0; i < museumCards.length; i++) {
        museumCards[i].classList.add("favorited");
      }
    });

    saved.forEach((key) => {
      const museumCards = document.getElementsByClassName(key[5]);
      for (let i = 0; i < museumCards.length; i++) {
        museumCards[i].classList.add("saved");
      }
    });
  }, [favorites, saved]);

  return (
    <>
      <nav>
        <div id="logo">
          <h1>
            <p>
              <p1>M</p1>USEUMS <p1>I</p1>N
            </p>
            <p>
              <p2>a</p2>
            </p>
            <p>
              <p1>N</p1>EW <p1>Y</p1>ORK
            </p>
          </h1>
          <div class="logo-stroke"></div>
        </div>
        <div className="user-lists">
          <button
            className="nav-favorite nav-action"
            onClick={() => openListMenu("nav-favorite")}
          >
            <img src="nav-favorite.svg" alt=""></img>
          </button>
          <button
            className="nav-save nav-action"
            onClick={() => openListMenu("nav-save")}
          >
            <img src="nav-save.svg" alt=""></img>
          </button>
        </div>
        <div className="filters">
          <button
            className="nav-filter nav-action"
            onClick={() => openListMenu("nav-filter")}
          >
            <img src="nav-filter.svg" alt=""></img>
          </button>
        </div>

        <div className="list-menu menu">
          <div className="favorites-list">
            <h1>
              <p>
                <p1>F</p1>AVORITES ({favorites.size})
              </p>
            </h1>
            <hr></hr>
            <div className="favorites-container">
              {favoriteMuseums.map((museum) => {
                return (
                  <Card
                    key={museum[5]}
                    title={museum[0]}
                    location={museum[1]}
                    price={museum[2]}
                    link={museum[3]}
                    image={museum[4]}
                    addToFavorites={addToFavorites}
                    addToSaved={addToSaved}
                    id={museum[5]}
                  ></Card>
                );
              })}
            </div>
            <div className="menu-footer">
              <div className="button-container">
                <button className="grid-view"></button>
                <button className="list-view"></button>
              </div>
              <div className="action-container">
                <button
                  className="secondary-button"
                  onClick={() => clearFavorites()}
                >
                  Clear favorites
                </button>
                <button
                  className="primary-button"
                  onClick={() => closeListMenu("nav-favorite")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          <div className="saved-list">
            <h1>
              <p>
                <p1>S</p1>AVED ({saved.size})
              </p>
            </h1>
            <hr></hr>
            <div className="saved-container">
              {savedMuseums.map((museum) => {
                return (
                  <Card
                    key={museum[5]}
                    title={museum[0]}
                    location={museum[1]}
                    price={museum[2]}
                    link={museum[3]}
                    image={museum[4]}
                    addToFavorites={addToFavorites}
                    addToSaved={addToSaved}
                    id={museum[5]}
                  ></Card>
                );
              })}
            </div>
            <div className="menu-footer">
              <div className="button-container">
                <button className="grid-view"></button>
                <button className="list-view"></button>
              </div>
              <div className="action-container">
                <button
                  className="secondary-button"
                  onClick={() => clearSaved()}
                >
                  Clear saved
                </button>
                <button
                  className="primary-button"
                  onClick={() => closeListMenu("nav-save")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="filter-menu menu">
          <div className="filters-container">
            <div className="filtering-section">
              <h2>SORT BY</h2>
              <div className="filtering-section-container">
                <div className="filter-option">
                  <p>Price (adult ticket)</p>
                  <div className="button-container">
                    <button
                      id="low-to-high"
                      className="sort-button"
                      onClick={() =>
                        sort !== "low-to-high"
                          ? setSort("low-to-high")
                          : setSort("")
                      }
                    >
                      Low to High
                    </button>
                    <button
                      id="high-to-low"
                      className="sort-button"
                      onClick={() =>
                        sort !== "high-to-low"
                          ? setSort("high-to-low")
                          : setSort("")
                      }
                    >
                      High to Low
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="filtering-section">
              <h2>FILTER BY</h2>
              <div className="filtering-section-container">
                <div className="filter-option">
                  <p>Location</p>
                  <div className="button-container">
                    <button
                      classList="filter-button"
                      id="upper-manhattan"
                      onClick={() => {
                        locFilter === "upper-manhattan"
                          ? setLocFilter("")
                          : setLocFilter("upper-manhattan");
                      }}
                    >
                      Upper Manhattan
                    </button>
                    <button
                      classList="filter-button"
                      id="middle-manhattan"
                      onClick={() => {
                        locFilter === "middle-manhattan"
                          ? setLocFilter("")
                          : setLocFilter("middle-manhattan");
                      }}
                    >
                      Middle Manhattan
                    </button>
                    <button
                      classList="filter-button"
                      id="lower-manhattan"
                      onClick={() => {
                        locFilter === "lower-manhattan"
                          ? setLocFilter("")
                          : setLocFilter("lower-manhattan");
                      }}
                    >
                      Lower Manhattan
                    </button>
                    <button
                      classList="filter-button"
                      id="queens"
                      onClick={() => {
                        locFilter === "queens"
                          ? setLocFilter("")
                          : setLocFilter("queens");
                      }}
                    >
                      Queens
                    </button>
                  </div>
                </div>
                <div className="filter-option">
                  <p>Genres</p>
                  <div className="button-container">
                    <button
                      classList="filter-button"
                      id="contemporary-art"
                      onClick={() => {
                        genreFilter === "contemporary-art"
                          ? setGenreFilter("")
                          : setGenreFilter("contemporary-art");
                      }}
                    >
                      Contemporary Art
                    </button>
                    <button
                      classList="filter-button"
                      id="design"
                      onClick={() => {
                        genreFilter === "design"
                          ? setGenreFilter("")
                          : setGenreFilter("design");
                      }}
                    >
                      Design
                    </button>
                    <button
                      classList="filter-button"
                      id="historic-art"
                      onClick={() => {
                        genreFilter === "historic-art"
                          ? setGenreFilter("")
                          : setGenreFilter("historic-art");
                      }}
                    >
                      Historic Art
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="menu-footer">
            <h1>
              <p>
                <p1>F</p1>ILTERS
              </p>
            </h1>
            <div className="action-container">
              <button
                className="secondary-button"
                onClick={() => clearFilters()}
              >
                Clear filters
              </button>
              <button
                className="primary-button"
                onClick={() => closeListMenu("nav-filter")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div class="container">
          {sortData(displayData).map((museum) => {
            return (
              <Card
                key={museum.id}
                title={museum.title}
                location={museum.location}
                price={museum.price}
                link={museum.link}
                image={museum.image}
                addToFavorites={addToFavorites}
                addToSaved={addToSaved}
                id={museum.id}
              ></Card>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
