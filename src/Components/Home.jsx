import { useSelector, useDispatch } from "react-redux";
import { addInvoice, deleteInvoice, editInvoice } from "../redux/InvoiceSlice";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Text,
  Button,
  Box,
  Spacer,
  Flex,
  Card,
  CardBody,
  IconButton,
  HStack,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import InvoiceDrawer from "./InvoiceDrawer";
import { db } from "./db";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider and createTheme
import InvoiceDetailsDrawer from "./InvoiceDetailsDrawer";

const Home = () => {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const invoices = useSelector((state) => state.invoices.invoices) || [];
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const cancelRef = useRef();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleRowClick = (params) => {
    const selectedInvoice = invoices.find((inv) => inv.id === params.row.id);
    setSelectedInvoiceId(selectedInvoice);
    setIsDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
  };

  const addNewInvoice = (newInvoice) => {
    const filteredInvoices = invoices.filter((inv) => inv.id !== newInvoice.id);
    const updatedInvoices = [...filteredInvoices, newInvoice];
    dispatch(addInvoice(updatedInvoices));
    setSelectedInvoiceId(null);
  };

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const invoices = await db.table("invoices").toArray();
        console.log("Retrieved invoices:", invoices);
        dispatch(addInvoice(invoices));
      } catch (error) {
        console.error("Error retrieving invoices:", error);
      }
    };
    loadInvoices();
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long" };
    const monthName = new Intl.DateTimeFormat("en-US", options).format(date);
    return `${date.getDate()} ${monthName} ${date.getFullYear()}`;
  };

  const handleNewInvoice = () => {
    setSelectedInvoiceId(null);
    onOpen();
  };

  const handleEditInvoice = (invoiceId) => {
    // Find the invoice by ID and set it as the selected invoice
    const selectedInvoice = invoices.find((inv) => inv.id === invoiceId);
    setSelectedInvoiceId(selectedInvoice ? selectedInvoice : null);
    onOpen();
  };

  // const handleEditInvoice = (invoiceId) => {
  //   // Find the invoice by ID
  //   const selectedInvoice = invoices.find((inv) => inv.id === invoiceId);

  //   // Assuming "items" is the property containing item details
  //   const selectedItemData = {
  //     ...selectedInvoice, // Copy other invoice details
  //     lineItems: selectedInvoice.lineItems ? [...selectedInvoice.lineItems] : [], // Copy items array
  //   };

  //   setSelectedInvoiceId(selectedItemData);
  //   onOpen();
  // };

  const handleDeleteInvoice = async () => {
    try {
      await db.table("invoices").delete(invoiceToDelete);
      // const updatedInvoices = invoices.filter((inv) => inv.id !== invoiceId);
      dispatch(deleteInvoice(invoiceToDelete));
      onAlertClose();
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const confirmDeleteInvoice = (invoiceId) => {
    setInvoiceToDelete(invoiceId);
    onAlertOpen();
  };

  const columns = [
    { field: "index", headerName: "#", width: 90 },
    { field: "invoiceNumber", headerName: "Invoice Number", width: 150 },
    { field: "customerName", headerName: "Customer Name", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "total", headerName: "Total Amount", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: ({ row }) => (
        <HStack align="end" mt={4} gap={10}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleEditInvoice(row.id);
            }}
          >
            <EditIcon color="black" fontSize="lg" />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              confirmDeleteInvoice(row.id);
            }}
          >
            <DeleteIcon color="red" fontSize="lg" />
          </IconButton>
        </HStack>
      ),
    },
  ];

  const rows = invoices
    .slice()
    .reverse()
    .map((invoice, index) => ({
      id: invoice.id,
      index: index + 1,
      invoiceNumber: invoice.invoiceNumber,
      customerName: invoice.customerName,
      date: invoice.date,
      total: invoice.total,
    }));

  // Define your custom theme for the DataGrid
  const dataGridTheme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            "&.MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              color: "#333",
            },
          },
        },
      },
    },
  });

  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex>
        <Button onClick={handleNewInvoice} mb={5} colorScheme="blue">
          <AddIcon mr={2} />
          Create New Invoice
        </Button>
        <Spacer />
      </Flex>
      <div style={{ height: 500, width: "100%" }}>
        <ThemeProvider theme={dataGridTheme}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            sx={{
              boxShadow: 1,
              borderRadius: "5px",
            }}
            onRowClick={handleRowClick}
          />
        </ThemeProvider>
      </div>
      <InvoiceDetailsDrawer
        isOpen={isDetailsOpen}
        onClose={handleDetailsClose}
        selectedInvoice={selectedInvoiceId}
      />
      <InvoiceDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        addNewInvoice={addNewInvoice}
        selectedInvoice={selectedInvoiceId}
      />
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Invoice
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this invoice? This action cannot
              be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteInvoice} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default Home;
