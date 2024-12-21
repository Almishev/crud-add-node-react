import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Grid from "../components/Grid";
import EditUser from "./EditUser";

const Container = styled.div`
  max-width: 1500px;
  margin: 20px auto;
  text-align: center;
`;

const Title = styled.h2``;

function UserList() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5;

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/users");
      setUsers(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const startIndex = currentPage * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <Container>
      <Title>Users</Title>

      {onEdit ? (
        <EditUser
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getUsers={getUsers} // Подаваме функцията за опресняване на потребителите
        />
      ) : (
        <>
          <Grid setOnEdit={setOnEdit} users={currentUsers} setUsers={setUsers} />
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(users.length / usersPerPage)}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page"}
            previousClassName={"page"}
            nextClassName={"page"}
          />
        </>
      )}
    </Container>
  );
}

export default UserList;
