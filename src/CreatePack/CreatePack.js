import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreatePack.css";
import axios from 'axios';






export default function CreatePack() {

    const [formState, setFormState] = useState({
        creator: "",
        packType: "",
        packName: "",
        packImageURL: "",
    })
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const api = axios.create({
        baseURL: "http://localhost:8080",
    });
    
    const submitCard = (event) => {
        event.preventDefault()
        setLoading(true)
        api.post("api/pack", formState)
        .then((response) => {
            setFormState({
                creator: "",
                packType: "",
                packName: "",
                packImageURL: "",
            })
            navigate("/")
            })
            .catch((error) => {
                console.error(`Error creating pack: ${error}`)
                setError(`Error creating pack: ${error}`)
            })
            .finally(() => {
                setLoading(false)
            })
        }
        const handleInputChange = (event) => {
            const {name, value} = event.target
            setFormState((prevState) => ({
                ...prevState,
                [name]: value,
            }))
        }
        return (
            <div className="createPack">
                <div className="addNewPack">
                    <h2 className="addNewPackH2">Add New Pack</h2>
                    <p>To use this, all you need to do is fill out the form with your preferred name, the type of card
                        pack that you are creating. Examples would be Pokemon, One Piece, Yugioh, etc. The name of 
                        the pack and the URL of the image you want to use for the pack. You can go to google images and 
                        copy the image address of the image you want to use.
                    </p>
                    <form onSubmit={submitCard}>
                        <label className="addNewPackCreator">Creator Name
                            <input 
                            className="addNewPackCreatorInput"
                            type="text"
                            name="creator"
                            value={formState.creator}
                            onChange={handleInputChange}
                            required
                            />
                        </label>
                        <label className="addNewPackPackType">
                            Pack type
                            <input 
                            className="addNewPackPackTypeInput"
                            type="text"
                            name="packType"
                            value={formState.packType}
                            onChange={handleInputChange}
                            required
                            />
                        </label>
                        <label className="addNewPackPackName">
                            Pack Name
                            <input 
                            className="addNewPackPackNameInput"
                            type="text"
                            name="packName"
                            value={formState.packName}
                            onChange={handleInputChange}
                            required
                            />
                        </label>
                        <label className="addNewPackPackImage">
                            Pack Image URL
                            <input 
                            className="addNewPackPackImageInput"
                            type="text"
                            name="packImageURL"
                            value={formState.packImageURL}
                            onChange={handleInputChange}
                            required
                            />
                        </label>
                        <div className="buttons">
                       <button className="addNewPackButton" type="submit" disabled={loading}
                        class="btn btn-primary btn-lg">
                           {loading ? "Loading..." : "Submit New Pack"} </button>
                        <Link to="/"><button class="btn btn-danger btn-lg">Cancel</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

