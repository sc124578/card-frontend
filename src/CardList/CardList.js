import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./CardList.css";
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [totalCards, setTotalCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [search, setSearch] = useState("");
  const [sortCriteria, setSortCriteria] = useState("cardNumber");
  const [sortOrder, setSortOrder] = useState("asc");
  const { packId } = useParams();
  const api = axios.create({
    baseURL: "https://card-backend-9fdv.onrender.com",
  });

  useEffect(() => {
    fetchCards();
  }, [packId, sortCriteria, sortOrder]);

  const fetchCards = () => {
    api.get(`api/pack/${packId}`)
      .then((response) => {
        const sortedCards = sortCards(response.data);
        setTotalCards(response.data.length);
        setClickedCards(response.data.filter(card => card.isClicked === 1).length);
        setCards(sortedCards);
        console.log(`API Response for pack ${packId}:`, response.data)
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this card?");
    if (confirmDelete) {
      api.delete(`api/pack/deletecard/${packId}/${id}`)
        .then((response) => {
          fetchCards();
        })
        .catch((error) => {
          console.error(`Error deleting card: ${error}`)
        })
    }
  }

  const ClickableImage = ({ imageUrl, card }) => {
    const [isClicked, setIsClicked] = useState(card.isClicked === 1);

    const handleClick = () => {
      if (card && card.id) {
        const cardId = card.id;
        const newClick = !isClicked;

        api.put(`api/pack/${packId}/${cardId}`, { isClicked: newClick ? 1 : 0 })
          .then((response) => {
            const updatedCard = response.data;
            console.log("isClicked updated successfully", updatedCard, response);
            setIsClicked(newClick);
          })
          .catch((error) => {
            console.error(`Error updating isClicked: ${error}`);
          });
      } else {
        console.warn("Card object or id is missing or undefined");
      }
    };

    const imageClassName = isClicked ? "cardImage clicked" : "cardImage";

    return (
      <img
        src={imageUrl}
        alt="Clickable Image"
        className={imageClassName}
        onClick={handleClick}
      />
    );
  };

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const sortCards = (cardsToSort) => {
    const sortedCards = [...cardsToSort];

    sortedCards.sort((a, b) => {
      const compareValueA = a[sortCriteria].toLowerCase();
      const compareValueB = b[sortCriteria].toLowerCase();

      if (compareValueA < compareValueB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (compareValueA > compareValueB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sortedCards;
  };

  const filteredCards = cards.filter((card) => {
    return (
      card.cardName.toLowerCase().includes(search.toLowerCase()) ||
      card.cardNumber.toLowerCase().includes(search.toLowerCase())
    )
  });

  return (
    <div className="addToPack">
      <div className="welcomeToPack">
        <Link to="/"><button className="backHome"><FontAwesomeIcon className="icon" icon={faArrowLeft} /></button></Link>
        <h2 className="welcomeToPackH2">Welcome to Your Pack</h2>
        <p className="welcomeToPackP">
          It is up to you to add your own cards to the pack. Just click the add
          button and follow the directions.
        </p>
        <div className="addToPackButton">
          <Link to={`/pack/${packId}/add-to-pack`}>
            <button
              className="homeButton"
              type="button"
              class="btn btn-primary btn-lg"
            >
              Add Card to Pack
            </button>
          </Link>
          <div className="sortOptions">
            <label className="sortBy">
              Sort by:
              <select
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
              >
                <option value="cardName">Card Name</option>
                <option value="cardNumber">Card Number</option>
              </select>
            </label>
            <label>
              Order:
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
          </div>
          <div className="cardSearch">
            <input
              className="cardSearchBar"
              type="text"
              onChange={handleSearch}
              placeholder="Search Cards"
            />
          </div>
        </div>
      </div>
      <div className="listedCards">
        <h2 className="listedCardsH2">Listed Cards</h2>
          <h3 className="totalCards">{`${clickedCards} of ${totalCards} collected!`}</h3>
        <div className="listedCardsList">
          {filteredCards.map((card, index) => (
            <div key={index} className="listedCard">
              <h3 className="cardName">{card.cardName}</h3>
              <ClickableImage imageUrl={card.cardImageURL} card={card} />
              <button id="deleteButton" className="btn btn-danger" onClick={() => handleDelete(card.id)}>Delete Card</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
