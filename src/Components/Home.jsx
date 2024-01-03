import { useSelector, useDispatch } from "react-redux";
import { addInvoice } from "../redux/InvoiceSlice";
import {
 useDisclosure,
 Text,
 Button,
 Box
} from "@chakra-ui/react";
import { useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";
import InvoiceDrawer from "./InvoiceDrawer";
import { db } from "./db";


const Home = () => {
 const dispatch = useDispatch();

 const { isOpen, onOpen, onClose } = useDisclosure();

 const invoices = useSelector((state) => state.invoices.invoices) || [];

 useEffect(() => {
  const loadInvoices = async () => {
  const invoices = await db.table('invoices').toArray();
  dispatch(addInvoice(invoices));
  };
 
  loadInvoices();
 }, [dispatch]);

 return (
   <div>
     <Button onClick={onOpen}>
       <AddIcon mr={2} />
       Create New Invoice
     </Button>
     <div>
       {invoices.map((invoice) => (
         <Box key={invoice.id}>
           <Text>{invoice.customerName}</Text>
           <Text>{invoice.date}</Text>
           <Text>{invoice.totalAmount}</Text>
           <Button>Edit</Button>
           <Button>Delete</Button>
         </Box>
       ))}
     </div>
     <InvoiceDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
   </div>
 );
};

export default Home;
