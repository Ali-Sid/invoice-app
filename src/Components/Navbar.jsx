// import React from 'react'
import { Box, Image } from "@chakra-ui/react";
import logo from "/Invoices.png";

const Navbar = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px',
    // backgroundColor: '#333',
    color: '#fff',
  }

  const logoStyle = {
    position: 'absolute',
    left: '20px',
  }

  const navLinksStyle = {
    display: 'flex',
    gap: '20px',
    // backgroundColor: "#f9f9f9",
    color: "#000"
  }

  return (
    <nav style={navStyle}>
      {/* <Box boxSize="sm" h={6} w={300}>
        <Image
          src={logo}
          alt="logo"
        />
      </Box> */}
      {/* <img src={logo} alt="logo" style={{width: "120px", marginLeft: 0}}/> */}
      <div style={logoStyle}><img src={logo} alt="logo" style={{width: "300px"}} /></div>
      <div style={navLinksStyle}>
        <a href="#">Home</a>
        <a href="#">Contacts</a>
        <a href="#">Recent Bills</a>
      </div>
    </nav>
  );
};

export default Navbar;
