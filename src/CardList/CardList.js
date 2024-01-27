import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./CardList.css";

export default function AddToPack() {
    const [cards, setCards] = useState([]);

    const api = axios.create({
        baseURL: "http://localhost:8080",
    })
     useEffect(() => {
        fetchCards()
    }, [])
    const { packId } = useParams();
    const fetchCards = () => {
       api.get(`api/packs/${packId}/cards`)
         .then((response) => {
              setCards(response.data)
         }) 
            .catch((error) => {
                console.error(`Error fetching data: ${error}`)
            })
    }
    return (
        <div className="addToPack">
            <div className="welcomeToPack">
                <h2 className="welcomeToPackH2">Welcome to Your Pack</h2>
                <p className="welcomeToPackP">It is up to you to add your own cards to the pack. Just click the add button
                and follow the directions. 
                </p>
                <div className="addToPackButton">
                    <Link to="/add-to-pack"><button className="homeButton" type="button" class="btn btn-primary btn-lg">
                        Add Card to Pack
                        </button>
                        </Link>
                </div>                
            </div>
            <div className="listedCards">
                <h2 className="listedCardsH2">Listed Cards</h2>
                    <div className="listedCardsList">
                        {cards.map((card, index) => (
                            <div key={index} className="listedCard">
                                <h3 className="cardName">{card.cardName}</h3>
                                <img src={card.cardImageURL} alt="Card Image" />
                            </div>
                        ))}
                    </div>
            </div>
        </div>
    )
}