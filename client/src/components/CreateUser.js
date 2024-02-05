import React, { Component } from "react";
import { Input, Flex, Center, InputRightElement, Button, InputGroup } from "@chakra-ui/react";

import axios from "axios";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  addUser = async (event) => {
    event.preventDefault();
    const api = "https://oose-team02-0b139de22250.herokuapp.com/";
    const name = this.state.name;
    try {
      const response = await axios.post(api, { name });
      console.log(response.data)
    } catch(err) {
      console.log(err);
    }
    this.setState({name: ""})
  };

  changeName = (event) => {
    this.setState({ name: event.target.value });
  }

  handleKeyPress = (e) => {
    if (e.code === "Enter") {
      this.addUser(e);
    }
  }

  render() {
    return (
      <Flex m={8} justify="center">
        <Center>
          <InputGroup size="md">
            <Input 
              id="long-input" 
              value={this.state.name} 
              width="400px" 
              placeholder="Enter name" 
              onChange={this.changeName}
              onKeyPress={this.handleKeyPress}  
            ></Input>
            <InputRightElement width="90px">
              <Button size="md" colorScheme="blue" onClick={this.addUser}>
                Add User!
              </Button>
            </InputRightElement>  
          </InputGroup>
        </Center>
      </Flex>
    );
  }
};

export default CreateUser;