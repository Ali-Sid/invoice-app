import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Text,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import About from "./About";

const Expense = () => {

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        // backgroundColor: "#000",
        width: "100%",
        height: "auto",
        // marginLeft: "-50px",
        position: "absolute",
        boxSizing: "border-box",
        top: "100%",
        left: "0",
        padding: "0 20px",
        // right: "20px"
      }}
    >
      <About />
    </Box>
  );
};

export default Expense;
