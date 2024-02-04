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

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios.get("https://oose-team02-0b139de22250.herokuapp.com/all")
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