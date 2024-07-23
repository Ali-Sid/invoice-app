import React from 'react'
import { Box, Image } from "@chakra-ui/react";
import logo from "/enlarge_Invoices.png";

const Navbar = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    backgroundColor: '#fff',
    // color: '#fff',
    zIndex: 10
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
      <div style={logoStyle}><img src={logo} alt="logo" style={{width: "250px"}} /></div>
      <div style={navLinksStyle}>
        <a href="#">Home</a>
        <a href="#">Contacts</a>
        <a href="#">Recent Bills</a>
      </div>
    </nav>
  );
};

export default Navbar;
