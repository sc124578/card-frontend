import React from "react";
import "./AddToPack.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Header() {
    const [formState, setFormState] = useState({
        cardName: "",
        cardNumber: "",
        cardImageURL: "",
    });
    const location = useLocation();
    const packId = location.pathname.split('/').pop();  
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const api = axios.create({
        baseURL: "http://localhost:8080",
    });
    const submitCard = (event) => {
        event.preventDefault()
        setLoading(true)
        api.post(`api/packs/${packId}/cards`, formState) 
        .then((response) => {
            setFormState({
                cardName: "",
                cardNumber: "",
                cardImageURL: "",
            })
        })
        .catch((error) => {
            console.error(`Error creating card: ${error}`)
        })
        .finally(() => {
            setLoading(false)
        })
        navigate(`/pack/${packId}`)
    }
    const handleCancel = () => {
        console.log("Before navigation - packId:", packId);
        navigate(`/pack/${packId || ''}`);
    }
    const handleInputChange = (event) => {
        const {name, value} = event.target
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
                }))
    }
    return (
        <div className="addToPack">
            <div className="addNewCard">
                <h2 className="addNewCardH2">Add New Card</h2>
                <p className="addNewCardP">To use this form, just fill out the form with the name of the card, the card card number,
                and a google image URL of the card. I need the card number so I can sort the cards by number. That way the pack is 
                in the appropriate order. Hit submit and it should add the card to the list. 
                </p>
                <form className="addCardForm" onSubmit={submitCard}>
                    <label>
                        Card Name:
                        <input
                            type="text"
                            className="cardName"
                            name="cardName"
                            value={formState.cardName}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Card Number:
                        <input
                            type="text"
                            className="cardNumber"
                            name="cardNumber"
                            value={formState.cardNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Card Image URL:
                        <input
                            type="text"
                            className="cardImageURL"
                            name="cardImageURL"
                            value={formState.cardImageURL}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <div className="addCardButtons">
                    <button className="addNewCardButton" type="submit" disabled={loading}
                        class="btn btn-primary btn-lg">
                           {loading ? "Loading..." : "Submit New Pack"} </button>
                           <button className="btn btn-danger btn-lg" type="button" onClick={handleCancel}>
    Cancel
</button>
                    </div>
                </form>
               
            </div>
        </div>
    )
}