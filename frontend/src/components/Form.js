import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.name.value = onEdit.name;
      user.email.value = onEdit.email;
      user.phone.value = onEdit.phone;
     
    }
  }, [onEdit]);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const user = ref.current;
  
    if (!user.name.value || !user.email.value || !user.phone.value) {
      return toast.warn("Fill all fields!");
    }
  
    const currentDate = new Date().toISOString().split("T")[0];
  
    const userData = {
      name: user.name.value,
      email: user.email.value,
      phone: user.phone.value,
      data_join: currentDate,
    };
  
    try {
      if (onEdit) {
        await axios
          .put("http://localhost:8800/users/" + onEdit.id, userData)
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      } else {
        await axios
          .post("http://localhost:8800/users", userData)
          .then(({ data }) => {
            toast.success(`User ${userData.name} added succesfull!`);
          })
          .catch(({ data }) => toast.error(data));
      }
    } catch (error) {
      toast.error("Error adding user.");
    }
  
    user.name.value = "";
    user.email.value = "";
    user.phone.value = "";
  
    setOnEdit(null);
    getUsers();
  };
  

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Name</Label>
        <Input name="name" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Phone</Label>
        <Input name="phone" />
      </InputArea>
     

      <Button type="submit">
  {onEdit ? "Edit User" : "Add User"}
</Button>

    </FormContainer>
  );
};

export default Form;
