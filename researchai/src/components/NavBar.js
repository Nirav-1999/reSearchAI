import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../assets/images/logo/logo.jpeg'
import classes from '../assets/css/Home/NavBar.module.css'


function NavBar (){
    // let useEffect = () => {
    //     document.getElementById("drop").click();
    //   }
    

    return (

        <div>
            
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#home">reSearchAI</Navbar.Brand>

                </Container>
            </Navbar>
            
        </div>
    
    )
}
  
export default NavBar;