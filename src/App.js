import React from "react";
import { BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Home/Home";
import CreatePack from "./CreatePack/CreatePack";
import CardList from "./CardList/CardList";
import AddToPack from "./AddToPack/AddToPack";
import UpdatePack from "./UpdatePack/UpdatePack";

export default function App() {
  return (
  <div className="App">
    <Router>
    <Header />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-pack" element={<CreatePack />} />
      <Route path="/pack/:packId" element={<CardList />} />
      <Route path="/pack/:packId/add-to-pack" element={<AddToPack />} />
      <Route path="/update-pack/:packId" element={<UpdatePack />} />
      </Routes>
    </Router>
  </div>
  )
}