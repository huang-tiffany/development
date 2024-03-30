import "./App.css";
import Card from "./components/Card";
import data from "./assets/data.json";
import { useEffect, useState } from "react";

function App() {
  const [favorites, setFavorites] = useState(new Map());
  const [favoriteMuseums, setFavoriteMuseums] = useState([]);

  const openListMenu = (button) => {
    document.querySelector(".list-menu").classList.add("open");
    document.querySelector(".user-lists").classList.add("open");

    const navButtons = document.getElementsByClassName("nav-action");
    for (let i = 0; i < navButtons.length; i++) {
      navButtons[i].classList.remove("open");
    }

    document.querySelector("." + button).classList.add("open");
  };

  const addToFavorites = (museum) => {
    if (favorites.has(museum[5])) {
      favorites.delete(museum[5]);
      setFavorites(favorites);
      const museumCards = document.getElementsByClassName(museum[5]);
      console.log(museum[5]);
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

  useEffect(() => {
    favorites.forEach((key) => {
      const museumCards = document.getElementsByClassName(key[5]);
      for (let i = 0; i < museumCards.length; i++) {
        museumCards[i].classList.add("favorited");
      }
    });
  }, [favorites]);

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
          <button className="nav-filter nav-action">
            <img src="nav-filter.svg" alt=""></img>
          </button>
        </div>
        <div className="list-menu menu">
          <h1>
            <p>
              <p1>F</p1>AVORITES
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
                  favorited="true"
                  saved="true"
                  link={museum[3]}
                  image={museum[4]}
                  addToFavorites={addToFavorites}
                  id={museum[5]}
                ></Card>
              );
            })}
          </div>
        </div>
      </nav>
      <main>
        <div class="container">
          {data.map((museum) => {
            return (
              <Card
                key={museum.id}
                title={museum.title}
                location={museum.location}
                price={museum.price}
                favorited="true"
                saved="true"
                link={museum.link}
                image={museum.image}
                addToFavorites={addToFavorites}
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
