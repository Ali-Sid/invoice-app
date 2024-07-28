import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import React from "react";

const InvoiceDetailsDrawer = ({ isOpen, onClose, selectedInvoice, profile }) => {
  if (!selectedInvoice) return null;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="xxl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Invoice Details</DrawerHeader>
        <DrawerBody>
          <Flex width="100%" mb={4}>
            <Box width="50%">
              <Text fontSize="lg" fontWeight="bold">
                Billed By:
              </Text>
              {/* <Text>{profile.businessName}</Text>
              <Text>{profile.address}</Text>
              <Text>{profile.gstRegisteredNumber}</Text>
              <Text>{profile.pan}</Text>
              <Text>{profile.email}</Text>
              <Text>{profile.phoneNumber}</Text> */}
            </Box>
            <Box width="50%">
              <Text fontSize="lg" fontWeight="bold">
                Billed To:
              </Text>
              <Text>{selectedInvoice.customerName}</Text>
              <Text>{selectedInvoice.streetAddress},</Text>
              <Text>{selectedInvoice.city},</Text>
              <Text>{selectedInvoice.postalCode},</Text>
              <Text>{selectedInvoice.country}</Text>
              <Text>{selectedInvoice.email}</Text>
              <Text>{selectedInvoice.phoneNumber}</Text>
            </Box>
          </Flex>
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold">
              Invoice Details:
            </Text>
            <Text>Invoice Number: {selectedInvoice.invoiceNumber}</Text>
            <Text>ID: {selectedInvoice.id}</Text>
            <Text>Date: {selectedInvoice.date}</Text>
            <Text>Description: {selectedInvoice.description}</Text>
          </Box>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Item Name</Th>
                <Th>Quantity</Th>
                <Th>Rate</Th>
                <Th>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {selectedInvoice.lineItems.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.itemName}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>{item.rate}</Td>
                  <Td>{item.amount}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Box mt={4} textAlign="right">
            <Text fontSize="lg" fontWeight="bold">
              Total: {selectedInvoice.total}
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Balance Due: {selectedInvoice.balanceDue}
            </Text>
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={onClose}>Close</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default InvoiceDetailsDrawer;