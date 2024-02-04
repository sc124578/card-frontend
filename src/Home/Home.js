import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from 'axios';
import defaultImg from "../Images/download.jpg";

export default function Home() {
    const [search, setsearch] = useState("")
    const [packs, setPacks] = useState([])
    const api = axios.create({
        baseURL: "http://localhost:8080",
    })

    useEffect(() => {
        fetchPacks()
    }, [])

    const fetchPacks = () => {
        api.get("api/pack")
            .then((response) => {
                setPacks(response.data)
            })
            .catch((error) => {
                console.error(`Error fetching data: ${error}`)
            })
          
    }
    const deletePack = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this pack?");
        api.delete(`api/pack/deletepack/${id}`)
        .then((response) => {
            fetchPacks();
        })
        .catch((error) => {
            console.error(`Error deleting pack: ${error}`);
        });
    }
    const handleSearch = (event) => {
        setsearch(event.target.value)
    }
    const filteredPacks = packs.filter((pack) => {
        return (
            pack.packName.toLowerCase().includes(search.toLowerCase()) ||
            pack.creator.toLowerCase().includes(search.toLowerCase()) ||
            pack.packType.toLowerCase().includes(search.toLowerCase())
        )
    });

    return (
        <div className="home">
            <h1 className="homeH1">Welcome to Card Checker</h1>
            <p className="homeP">Here is a site made for people to create card packs. The packs are meant to be inputed by
            the user in order for them to keep track of what they have pulled so far. Below are the packs people have
            created for themselves. Click the button to start keeping track of your own packs!</p>

            <div className="homeB">
                <Link to="/create-pack"><button className="homeButton" type="button" class="btn btn-primary btn-lg">Create New Pack</button></Link>
            </div>
            <div className="homePacks">
                <h2 className="homeH2">Packs</h2>
                <div className="searchPacks">
                    <input type="text" placeholder="Search Packs" onChange={handleSearch} className="searchPacksBar" />
                </div>
                <div className="homePacksList">
                 
                    {filteredPacks.map((pack, index) => (
                        <div key={index} className="homePack">
                             <p className="homePackP">{pack.packName}</p>
                            <Link to={`/pack/${pack.id}`}>
                               <img className="homePackImg" src={pack.packImageURL ? pack.packImageURL : defaultImg} 
                               alt="Pack Image" />
                            </Link>
                            <h3 className="homePackH3">{`${pack.creator}'s ${pack.packType} Pack`}</h3>
                            <button class="btn btn-danger" onClick={() => deletePack(pack.id)}>Delete Pack</button>
                           <Link to={`/update-pack/${pack.id}`} ><button class="btn btn-warning">Edit Pack</button></Link>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    )
}
