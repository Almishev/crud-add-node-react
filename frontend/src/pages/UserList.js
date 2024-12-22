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

const SearchInput = styled.input`
  padding: 10px;
  margin: 20px 0;
  width: 250px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

function UserList() {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const usersPerPage = 5;

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/users");
      setUsers(res.data);
      setSortedUsers(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSort = (column) => {
    const newOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newOrder);

    const sorted = [...sortedUsers].sort((a, b) => {
      if (a[column] < b[column]) return newOrder === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    setSortedUsers(sorted);
    setCurrentPage(0); 
  };


  const filteredUsers = sortedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const startIndex = currentPage * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleDelete = async (id) => {
    // Find the user by id to get the name
    const userToDelete = users.find((user) => user.id === id);
  
    if (!userToDelete) return; // Ensure user exists
  
    const isConfirmed = window.confirm(`Are you sure you want to delete ${userToDelete.name}?`);
    if (!isConfirmed) return;
  
    try {
      await axios.delete(`http://localhost:8800/users/${id}`);
      const newArray = users.filter((user) => user.id !== id);
      setUsers(newArray);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Error deleting user.");
    }
  };
  

  return (
    <Container>
      <Title>Users</Title>
      <SearchInput
        type="text"
        placeholder="Search by name, email, or phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      {onEdit ? (
        <EditUser
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getUsers={getUsers}
        />
      ) : (
        <>
          <Grid
            users={currentUsers}  
            handleSort={handleSort}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
            setOnEdit={setOnEdit}
            handleDelete={handleDelete}
          />
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(filteredUsers.length / usersPerPage)}  
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
