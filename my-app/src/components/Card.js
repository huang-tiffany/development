export default function Card(props) {
  const {
    title,
    location,
    price,
    link,
    image,
    addToFavorites,
    addToSaved,
    id,
  } = props;
  return (
    <div className={"card " + id}>
      <div className="card-image">
        <img src={image} alt={title}></img>
        <button className="link">
          <a href={link} target="_blank" rel="noreferrer">
            <img src="link.svg" alt=""></img>
          </a>
        </button>

        <div className="action-buttons">
          <button
            className="favorite"
            onClick={() =>
              addToFavorites([title, location, price, link, image, id])
            }
          ></button>
          <button
            className="save"
            onClick={() =>
              addToSaved([title, location, price, link, image, id])
            }
          ></button>
        </div>
      </div>
      <div className="card-data">
        <h2>{title}</h2>
        <p className="location-price">
          {location} · {(price > 0 ? "$" + price : "Free ") + " admission"}
        </p>
      </div>
    </div>
  );
}
