"use client";

import React, { useEffect, useState } from "react";
import axios from "axios"

export default function UserTable() {

  const [ data, setData ] = useState([]);

  useEffect(() => {
    axios.get("https://oose-team02-0b139de22250.herokuapp.com/all")
      .then((result) => setData(result.data.data))
  })

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Database ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((record, index) => {
              <tr key={index}>
                <td>{ record._id }</td>
                <td>{ record.name }</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )

}