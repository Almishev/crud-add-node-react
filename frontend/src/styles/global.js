import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    font-family: 'poppins', sans-serif;
  }
  
  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #f2f2f2;
  }

  .pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 10px;
  gap: 10px;
}

.page {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f9f9f9;
}

.page:hover {
  background-color: #ddd;
}

.active {
  background-color: #4caf50;
  color: white;
  border: none;
}

`;

export default Global;