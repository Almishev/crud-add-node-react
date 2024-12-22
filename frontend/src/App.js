import GlobalStyle from "./styles/global";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "./pages/UserList";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";




const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  background-color: #2c73d2;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;



function App() {
  return (
    <Router>
      <GlobalStyle />
      <Nav>
        <NavLink to="/">Users</NavLink>
        <NavLink to="/add-user">Add User</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        
      </Nav>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/signup" element={<div>Sign Up Page</div>} />
      </Routes>
      <ToastContainer autoClose={4000} position="bottom-left" />
    </Router>
    
  );
}

export default App;
