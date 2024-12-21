import React from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const Form = styled.form`
  margin: 20px auto;
  padding: 20px;
  max-width: 500px;
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;

  input {
    margin-bottom: 10px;
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    padding: 10px;
    margin: 5px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const EditUser = ({ onEdit, setOnEdit, getUsers }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/users/${onEdit.id}`, onEdit);
      toast.success("User updated successfully!");
      setOnEdit(null); // Затваряме формуляра след успешно редактиране
      getUsers(); // Опресняваме списъка с потребители
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Edit User</h3>
      <input
        type="text"
        placeholder="Name"
        value={onEdit.name}
        onChange={(e) =>
          setOnEdit((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={onEdit.email}
        onChange={(e) =>
          setOnEdit((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <input
        type="text"
        placeholder="Phone"
        value={onEdit.phone}
        onChange={(e) =>
          setOnEdit((prev) => ({ ...prev, phone: e.target.value }))
        }
      />
      <button type="submit">Save</button>
      <button type="button" onClick={() => setOnEdit(null)}>
        Cancel
      </button>
    </Form>
  );
};

export default EditUser;
