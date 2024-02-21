"use client";

import React, { useState } from "react";
import axios from "axios";

export default function CreateUser() {

  const [ name, setName ] = useState("");

  const addUser = async (event) => {
    event.preventDefault();
    const url = "https://oose-team02-0b139de22250.herokuapp.com/";
    try {
      await axios.post(url, { name });
    } catch(err) {
      console.log(err);
    }
    setName("");
  };

  return (
    <div>
      <input
        value={name}
        onChange={ (event) => setName(event.target.value) }
        placeholder="Enter name"
      />
      <button
        onClick={addUser}
      >
        Add User
      </button>
    </div>
  );

};