import React, { useState } from "react";
import styled from "styled-components";
import Form from "../components/Form";

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  text-align: center;
`;

const Title = styled.h2``;

function AddUser() {
  const [onEdit, setOnEdit] = useState(null);

  const refreshUsers = () => {
    console.log("User added/edited. No user list on this page.");
  };

  return (
    <Container>
      <Title>Add User</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={refreshUsers} />
    </Container>
  );
}

export default AddUser;
