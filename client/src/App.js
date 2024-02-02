import React, { Component } from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
// We import all the components we need in our app
import { ChakraProvider, Table } from '@chakra-ui/react'
import CreateUser from "./components/CreateUser";
import UserTable from "./components/UserTable";
import axios from "axios";

class App extends Component {

  render() {

    return (
      <ChakraProvider>
        <CreateUser />
        <UserTable />
      </ChakraProvider>
    );
  };

  getData = async () => {
    const api = "http://localhost:6300/all";
    try {
      const response = await axios.get(api);
      console.log(response.data)
    } catch (err) {
      console.log(err);
    }
  }
}

export default App;