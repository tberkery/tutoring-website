import {
  Table,
  Thead,
  Tbody,
  // Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import React, { Component } from "react";
import axios from "axios"

class UserTable extends Component {

  getData = async () => {
    const api = "http://localhost:6300/all";
    try {
      const response = await axios.get(api);
      console.log(response.data)
    } catch (err) {
      console.log(err);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:6300/all")
      .then(result => {
        const data = result.data.data
        // console.log(data)
        this.setState({ data })
      })
  }

  render() {
    return (
      <TableContainer>
        <Table variant='simple'>
        <TableCaption>For now, you must refresh the page after adding a user</TableCaption>
          <Thead>
            <Tr>
              <Th>Database ID</Th>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {this.state.data.map((val, key) => {
              // console.log(key)
              return (
                <Tr key={key}>
                  <Td>{val._id}</Td>
                  <Td>{val.name}</Td>
                </Tr>

              )
            })}
          </Tbody>
        </Table>
      </TableContainer>)
  }
}


export default UserTable;