import React from "react";
import styled from "styled-components";
import { FaTrash, FaEdit, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const Table = styled.table`
   width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1200px;
  margin: 20px auto;
  word-break: break-all;
  border-collapse: collapse;
`;

const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Tr = styled.tr`
  border-bottom: 1px solid #ccc; 
`;
const Th = styled.th`
   text-align: start;
  border-bottom: 2px solid #ccc; 
  padding-bottom: 5px;
  cursor: pointer;
  padding: 10px;
  background-color: #f4f4f4; 
`;

const Td = styled.td`
 padding: 15px;
  text-align: start;
  width: ${(props) => (props.width ? props.width : "auto")};
  border: 1px solid #ccc; 
`;

const Grid = ({ users, handleSort, sortColumn, sortOrder, setOnEdit, handleDelete }) => {
  return (
    <Table>
      <Thead>
        <Tr>
        <Th onClick={() => handleSort("name")}>
            Name 
            {sortColumn === "name" ? (
              sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />
            ) : (
              <FaSort />
            )}
          </Th>
          <Th onClick={() => handleSort("email")}>
            Email
            {sortColumn === "email" ? (
              sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />
            ) : (
              <FaSort />
            )}
          </Th>
          <Th onClick={() => handleSort("phone")}>
            Phone
            {sortColumn === "phone" ? (
              sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />
            ) : (
              <FaSort />
            )}
          </Th>
          <Th onClick={() => handleSort("data_join")}>
            Date
            {sortColumn === "data_join" ? (
              sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />
            ) : (
              <FaSort />
            )}
          </Th>
          <Th>Edit</Th>
          <Th>Delete</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item) => (
          <Tr key={item.id}>
            <Td>{item.name}</Td>
            <Td>{item.email}</Td>
            <Td>{item.phone}</Td>
            <Td>{new Date(item.data_join).toISOString().split("T")[0]}</Td>
            <Td>
              <FaEdit onClick={() => setOnEdit(item)} style={{ cursor: "pointer", color: "blue" }} />
            </Td>
            <Td>
              <FaTrash onClick={() => handleDelete(item.id)} style={{ cursor: "pointer", color: "red" }} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
