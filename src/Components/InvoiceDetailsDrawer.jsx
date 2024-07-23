import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";

const InvoiceDetailsDrawer = ({ isOpen, onClose, selectedInvoice }) => {
  if (!selectedInvoice) return null;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Invoice Details</DrawerHeader>
        <DrawerBody>
          <h2>Invoice Number: {selectedInvoice.invoiceNumber}</h2>
          <p>ID: {selectedInvoice.id}</p>
          <p>Date: {selectedInvoice.date}</p>
          <p>Customer Name: {selectedInvoice.customerName}</p>
          <p>Email: {selectedInvoice.email}</p>
          <p>Phone Number: {selectedInvoice.phoneNumber}</p>
          <p>Street Address: {selectedInvoice.streetAddress}</p>
          <p>City: {selectedInvoice.city}</p>
          <p>Postal Code: {selectedInvoice.postalCode}</p>
          <p>Country: {selectedInvoice.country}</p>
          <p>Description: {selectedInvoice.description}</p>
          <p>Total: {selectedInvoice.total}</p>

          <h3>Line Items:</h3>
          <ul>
            {selectedInvoice.lineItems.map((item, index) => (
              <li key={index}>
                <p>Item Name: {item.itemName}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Rate: {item.rate}</p>
                <p>Amount: {item.amount}</p>
              </li>
            ))}
          </ul>
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={onClose}>Close</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default InvoiceDetailsDrawer;
