import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdatePack.css";


export default function UpdatePack() {
    const [formState, setFormState] = useState({
        packName: "",
        creator: "",
        packType: "",
        packImageURL: ""
    });
    const navigate = useNavigate();
    const { packId } = useParams();
    const [loading, setLoading] = useState(false);
    const api = axios.create({
        baseURL: "http://localhost:8080",
    });

    const submitUpdate = (event) => {
        event.preventDefault();
        setLoading(true);
        api.put(`api/pack/${packId}`, formState)
            .then((response) => {
                setFormState({
                    packName: "",
                    creator: "",
                    packType: "",
                    packImageURL: ""
                })
            }) 
            .catch((error) => {
                console.error(`Error updating pack: ${error}`);
            })
            .finally(() => {
                setLoading(false);
              });
              navigate("/")
    }
    const handleCancel = () => {
        navigate(`/`);
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="updatePack">
            <div className="updatePackH2">
                <h2>
                    Update Pack
                </h2>
                <p>If you messed something up n your orginal adding of the pack, Here is where you can fix it. You'll
                    have to put all of the information in again so make sure it is right the second time.
                </p>
            </div>
            <div className="updatePackForm">
                <form className="updateForm" onSubmit={submitUpdate}>
                    <label>Creator
                        <input 
                            type="text"
                            name="creator"
                            placeholder="creator"
                            value={formState.creator}
                            onChange={handleInputChange}
                            className="creatorInput"
                            required
                            />
                            </label>
                            <label>Pack Type
                            <input
                            type="text"
                            name="packType"
                            placeholder="packType"
                            value={formState.packType}
                            onChange={handleInputChange}
                            className="packTypeInput"
                            required
                            />
                            </label>
                            <label>
                                Pack Name
                                <input
                                type="text"
                                name="packName"
                                placeholder="packName"
                                value={formState.packName}
                                onChange={handleInputChange}
                                className="packNameInput"
                                required
                                />
                            </label>
                            <label>Pack Image URL
                            <input
                            type="text"
                            name="packImageURL"
                            placeholder="packImageURL"
                            value={formState.packImageURL}
                            onChange={handleInputChange}
                            className="packImageURLInput"
                            required
                            />
                            </label>
                            <button className="updateSubmit" type="submit" disabled={loading} class="btn btn-primary btn-lg">
                                {loading ? "Loading..." : "Submit Update"}
                            </button>
                            <button className="updateCancel" type="button" onClick={handleCancel} class="btn btn-danger btn-lg">
                                Cancel
                            </button>
                </form>
            </div>
        </div>
    )

}