import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

// Стили за таблицата
const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1200px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"};
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"};
  }
`;

// Основният компонент Grid
const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item); // Настройва текущия потребител за редактиране
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:8800/users/${id}`);
      const newArray = users.filter((user) => user.id !== id);
      setUsers(newArray); // Актуализира списъка с потребители
      toast.success(data); // Показва съобщение за успешно изтриване
    } catch (error) {
      toast.error("Error deleting user.");
    }
    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th onlyWeb>Phone</Th>
          <Th width="20%">Register Date</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.name}</Td>
            <Td width="30%">{item.email}</Td>
            <Td width="20%" onlyWeb>
              {item.phone}
            </Td>
            <Td width="20%">
              {(() => {
                try {
                  return new Date(item.data_join).toISOString().split("T")[0];
                } catch (error) {
                  console.error("Error parsing date:", error);
                  return "Invalid Date";
                }
              })()}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit
                onClick={() => handleEdit(item)}
                style={{ cursor: "pointer", color: "blue" }}
              />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash
                onClick={() => handleDelete(item.id)}
                style={{ cursor: "pointer", color: "red" }}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
