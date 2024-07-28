import { useSelector, useDispatch } from "react-redux";
import { addInvoice, editInvoice } from "../redux/InvoiceSlice";
import { v4 as uuidv4 } from "uuid";
import {
  useDisclosure,
  Drawer,
  FormControl,
  Text,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  Input,
  Button,
  FormLabel,
  CloseButton,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  InputGroup,
  // InputRightAddon,
  // IconButton,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import { db } from "./db";
import PropTypes from "prop-types";
// import { RepeatIcon } from "@chakra-ui/icons";
// import { AiOutlinePercentage } from "react-icons/ai";

const InvoiceDrawer = ({ isOpen, onOpen, onClose, selectedInvoice }) => {
  const dispatch = useDispatch();
  // const invoices = useSelector((state) => state.invoices)

  const [lineItems, setLineItems] = useState([
    { itemName: "", quantity: 0, rate: 0, amount: 0 },
  ]);

  const [selectedCurrency, setSelectedCurrency] = useState("$");

  const [invoices, setInvoices] = useState([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  // const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState(1);

  function generateInvoiceNumber() {
    const d = new Date();
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2); // Add leading zero for single digit months
    const day = ("0" + d.getDate()).slice(-2); // Add leading zero for single digit days
    const hours = ("0" + d.getHours()).slice(-2); // Add leading zero for single digit hours
    const minutes = ("0" + d.getMinutes()).slice(-2); // Add leading zero for single digit minutes

    const invoiceNumber = "" + year + month + day + hours + minutes;
    return invoiceNumber;
  }

  const [formData, setFormData] = useState({
    invoiceNumber: generateInvoiceNumber(),
    customerName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "",
    invoiceDate: "",
    description: "",
    lineItems: [],
    subtotal: 0,
    extraFields: [],
    amountPaid: 0,
    balanceDue: 0,
  });

  // Effect to update formData whenever lineItems changes
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      lineItems: lineItems, // Update lineItems in formData
    }));
  }, [lineItems]);

  useEffect(() => {
    if (selectedInvoice) {
      setFormData(selectedInvoice);
    } else {
      resetForm();
    }
  }, [selectedInvoice]);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   console.log(`Input changed: ${name}, new value: ${value}`);

  //   if (name.startsWith("lineItems")) {
  //     const [_, index, field] = name.split(".");
  //     const updatedLineItems = [...formData.lineItems];
  //     updatedLineItems[parseInt(index)][field] = value;
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       lineItems: updatedLineItems,
  //     }));
  //   } else {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [name]: value,
  //     }));
  //   }
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Check if the input belongs to a line item
    if (name.startsWith("lineItems")) {
      const [_, index, field] = name.split(".");
      const updatedLineItems = formData.lineItems.map((item, i) => {
        if (i === parseInt(index)) {
          return { ...item, [field]: value };
        }
        return item;
      });

      // Update formData with the modified lineItems array
      setFormData((prevFormData) => ({
        ...prevFormData,
        lineItems: updatedLineItems,
      }));

      if (name === "invoiceDate") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          invoiceDate: value,
        }));
      }
    } else {
      // Handle regular input fields
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // Update the handleEditInvoice function to set the selected invoice ID
  const handleEditInvoice = (invoiceId) => {
    setSelectedInvoiceId(invoiceId);
    onOpen();
  };

  const handleUpdate = (updatedInvoice) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === updatedInvoice.id ? updatedInvoice : invoice
    );

    dispatch(editInvoice(updatedInvoices));
    // setRows((prevRows) =>
    //   prevRows.map((row) => (row.id === newInvoice.id ? newInvoice : row))
    // ); // Update rows based on updated invoice
  };

  // const handleSubmit = () => {
  //   // const totalAmount = calculateTotal();

  //   const newInvoice = {
  //     id: uuidv4(),
  //     invoiceNumber: formData.invoiceNumber,
  //     date: new Date().toLocaleDateString(),
  //     customerName: formData.customerName,
  //     email: formData.email,
  //     phoneNumber: formData.phoneNumber,
  //     streetAddress: formData.streetAddress,
  //     city: formData.city,
  //     postalCode: formData.postalCode,
  //     country: formData.country,
  //     description: formData.description,
  //     lineItems: formData.lineItems,
  //     total: calculateTotal(),
  //   };

  //   // setCurrentInvoiceNumber(currentInvoiceNumber + 1);

  //   // Add the new invoice to the invoices state
  //   setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);

  //   // const existingInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
  //   // const updatedInvoices = [...existingInvoices, newInvoice];

  //   // setInvoices(updatedInvoices);
  //   db.table("invoices")
  //     .put(newInvoice)
  //     .then(() => {
  //       handleUpdate(newInvoice);
  //       onClose();
  //     })
  //     .catch((error) => {
  //       console.error("Error storing invoice", error);
  //     });

  //   // localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
  //   dispatch(addInvoice(newInvoice));

  //   // Close the drawer after submitting the form
  //   onClose();
  // };

  // Update the handleSubmit function to handle updating existing invoices
  const handleSubmit = () => {
    const newInvoice = {
      id: selectedInvoiceId || uuidv4(), // Use existing ID for editing or generate a new one
      ...formData,
      total: calculateTotal(),
    };

    if (selectedInvoiceId) {
      handleUpdate(newInvoice); // Update existing invoice
    } else {
      setInvoices([...invoices, newInvoice]); // Add new invoice
    }

    if (selectedInvoice) {
      dispatch(editInvoice(newInvoice));
    } else {
      addInvoice(newInvoice);
    }

    db.table("invoices")
      .put(newInvoice)
      .then(() => {
        onClose();
        setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
      })
      .catch((error) => {
        console.error("Error storing invoice", error);
      });
  };

  const resetForm = () => {
    setFormData({
      invoiceNumber: generateInvoiceNumber(),
      customerName: "",
      email: "",
      phoneNumber: "",
      streetAddress: "",
      city: "",
      postalCode: "",
      country: "",
      invoiceDate: "",
      description: "",
      lineItems: [{ itemName: "", quantity: 0, rate: 0, amount: 0 }],
      subtotal: 0,
      extraFields: [],
      amountPaid: 0,
      balanceDue: 0,
    });
  };

  const [subtotal, setSubtotal] = useState(0);
  // const [tax, setTax] = useState(0);
  // const [discount, setDiscount] = useState(0);
  // const [shippingCharges, setShippingCharges] = useState(0);

  // const [isPercentageMode, setIsPercentageMode] = useState(false);

  const [extraFields, setExtraFields] = useState([]);

  const [amountPaid, setAmountPaid] = useState(0);
  const [balanceDue, setBalanceDue] = useState(0);

  const handleAddLineItem = () => {
    const newLineItem = {
      itemName: "",
      quantity: 0,
      rate: 0,
      amount: 0,
    };
    setLineItems([...lineItems, newLineItem]);
    console.log([...lineItems, newLineItem]);
  };

  // // Use a functional update to avoid direct mutation
  // const handleItemChange = (index, event) => {
  //   console.log(event);
  //   const { name, value } = event.target;
  //   console.log(
  //     `Updating item at index ${index}, field: ${name}, new value: ${value}`
  //   );
  //   setLineItems((prevLineItems) =>
  //     prevLineItems.map((item, i) =>
  //       i === index ? { ...item, [name]: value } : item
  //     )
  //   );

  //   // Update formData with the updated lineItems
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     lineItems: [...lineItems], // Spread the updated array
  //   }));
  //   console.log(formData);
  // };

  // const handleDeleteLineItem = (index) => {
  //   setLineItems((prevLineItems) =>
  //     prevLineItems.filter((_item, i) => i !== index)
  //   );
  // };

  // useEffect(() => {
  //   const updateSubtotal = () => {
  //     const totalAmount = lineItems.reduce(
  //       (total, item) => total + item.amount,
  //       0
  //     );
  //     setSubtotal(totalAmount);
  //   };

  //   updateSubtotal();
  // }, [lineItems]);

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    let updatedLineItems = [...lineItems];
    let item = { ...updatedLineItems[index] };
    item[name] = value;

    if (name === "quantity" || name === "rate") {
      const quantity = parseFloat(item.quantity);
      const rate = parseFloat(item.rate);
      item.amount = isNaN(quantity) || isNaN(rate) ? 0 : quantity * rate;
    }

    updatedLineItems[index] = item;
    setLineItems(updatedLineItems);

    // Calculate the new subtotal and balance due
    const subtotal = updatedLineItems.reduce(
      (sum, item) => sum + parseFloat(item.amount),
      0
    );
    const balanceDue = subtotal - formData.amountPaid;

    // Update formData with the updated lineItems, subtotal, and balanceDue
    setFormData((prevFormData) => ({
      ...prevFormData,
      lineItems: [...updatedLineItems],
      subtotal: subtotal,
      balanceDue: balanceDue,
    }));
  };

  // For Tax Field
  //   const handleTaxMode = () => {
  //     setIsPercentageMode(!isPercentageMode);
  //   };

  // For Discount and Shipping fields
  // const handleExtraMode = (id) => {
  //   setExtraFields((prevExtraFields) =>
  //     prevExtraFields.map((field) =>
  //       field.id === id
  //         ? {
  //             ...field,
  //             isPercentageMode: false, // Remove percentage mode for all three fields
  //             amount: field.amount,
  //           }
  //         : field
  //     )
  //   );
  // };

  const handleChange = (e, index) => {
    const values = [...lineItems];
    values[index][e.target.name] = e.target.value;
    setLineItems(values);
  };

  // for adding extra fields when the a button is clicked
  const handleAddExtraField = (fieldType, value) => {
    console.log(`Adding ${fieldType}:`, value);
    const newField = {
      id: uuidv4(), // Generate a unique ID for the new field
      type: fieldType,
      amount: value,
    };
    setExtraFields((prevExtraFields) => [...prevExtraFields, newField]);
  };

  // for handling the values in the extra fields
  // const handleExtraFieldChange = (index, field, value) => {
  //   const updatedExtraFields = formData.extraFields.map((item, i) => {
  //     if (i === index) {
  //       return { ...item, [field]: value };
  //     }
  //     return item;
  //   });

  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     extraFields: updatedExtraFields,
  //   }));

  //   setExtraFields(updatedExtraFields);
  // };

  const handleExtraFieldChange = (index, field, value) => {
    const updatedExtraFields = extraFields.map((item, i) =>
      i !== index ? item : { ...item, [field]: value }
    );

    setExtraFields(updatedExtraFields);
    setFormData((prevFormData) => ({
      ...prevFormData,
      extraFields: updatedExtraFields,
    }));
  };

  // For deleting extra fields
  const handleDeleteField = (index) => {
    setExtraFields((extraField) => {
      return extraField.filter((_item, i) => i !== index);
    });
  };

  // const calculateTotal = useCallback(() => {
  //   try {
  //     let total = subtotal;
  //     console.log("Subtotal:", subtotal);

  //     // Calculate tax amount
  //     const taxFields = extraFields.filter((field) => field.type === "Tax");
  //     const taxRate =
  //       taxFields.length > 0
  //         ? taxFields.reduce(
  //             (acc, field) =>
  //               acc +
  //               (field.isPercentageMode
  //                 ? (subtotal * field.amount) / 100
  //                 : parseFloat(field.amount)),
  //             0
  //           )
  //         : 0;

  //     console.log("Tax Field", taxFields);
  //     console.log("Tax Rate:", taxRate);

  //     // Calculate discount amount
  //     const discountFields = extraFields.filter(
  //       (field) => field.type === "Discount"
  //     );
  //     const discountRate =
  //       discountFields.length > 0
  //         ? discountFields.reduce(
  //             (acc, field) =>
  //               acc +
  //               (field.isPercentageMode
  //                 ? (subtotal * field.amount) / 100
  //                 : parseFloat(field.amount)),
  //             0
  //           )
  //         : 0;

  //     console.log("Discount Rate:", discountRate);

  //     // Calculate shipping charges
  //     const shippingFields = extraFields.filter(
  //       (field) => field.type === "Shipping"
  //     );
  //     const shippingCharge =
  //       shippingFields.length > 0
  //         ? shippingFields.reduce(
  //             (acc, field) =>
  //               acc +
  //               (field.isPercentageMode
  //                 ? (subtotal * field.amount) / 100
  //                 : parseFloat(field.amount)),
  //             0
  //           )
  //         : 0;

  //     console.log("Shipping Charge:", shippingCharge);

  //     total += taxRate + shippingCharge - discountRate;

  //     console.log("Total:", total);

  //     return total;
  //   } catch (error) {
  //     console.error("Error calculating total:", error);
  //   }
  // }, [extraFields, subtotal]);

  // const calculateTotal = useCallback(() => {
  //   let total = 0;
  //   lineItems.forEach((item) => {
  //     total += item.amount;
  //   });
  //   return total;
  // }, [lineItems]);

  // useEffect(() => {
  //   const total = calculateTotal();
  //   setAmountPaid(total);
  //   setBalanceDue(total);
  // }, [calculateTotal, extraFields, subtotal]);

  const calculateSubtotal = useCallback(() => {
    let subtotal = 0;
    lineItems.forEach((item) => {
      subtotal += item.amount;
    });
    setSubtotal(subtotal);
  }, [lineItems]);

  useEffect(() => {
    calculateSubtotal();
  }, [calculateSubtotal]);

  const calculateTotal = useCallback(() => {
    let total = subtotal;
    extraFields.forEach((field) => {
      if (field.type === "Tax") {
        total += field.isPercentageMode
          ? subtotal * (parseFloat(field.amount) / 100)
          : parseFloat(field.amount);
      } else if (field.type === "Discount") {
        total -= field.isPercentageMode
          ? subtotal * (parseFloat(field.amount) / 100)
          : parseFloat(field.amount);
      } else if (field.type === "Shipping") {
        total += parseFloat(field.amount);
      }
    });
    return total;
  }, [subtotal, extraFields]);

  useEffect(() => {
    setAmountPaid(calculateTotal());
    setBalanceDue(calculateTotal());
  }, [calculateTotal]);

  return (
    <Drawer
      placement="left"
      isOpen={isOpen}
      onClose={onClose}
      colorScheme="teal"
      size="xl"
    >
      {/* Invoice form content here */}
      <DrawerOverlay />
      <DrawerContent pl="120px" pr="50px">
        <DrawerCloseButton />
        <DrawerHeader fontSize="xx-large">
          {selectedInvoice ? "Edit Invoice" : "Create New Invoice"}
        </DrawerHeader>

        <DrawerBody>
          <Text fontSize="large" color="blue">
            Customer Details
          </Text>
          <FormControl
            onSubmit={handleSubmit}
            mt="30px"
            sx={{ marginTop: "30px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: "20px",
              }}
            >
              <FormLabel fontSize="24px">
                <b>Invoice:</b>
              </FormLabel>
              <Text fontSize="24px" mr={2}>
                <b>#</b>
              </Text>
              <Input
                w="25%"
                type="number"
                name="invoiceNumber"
                value={formData.invoiceNumber || ""}
                onChange={handleInputChange}
              />
            </div>

            <FormLabel>Customer Name</FormLabel>
            <Input
              placeholder="John Doe"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
            />
            <FormLabel sx={{ mt: "20px" }}>Email</FormLabel>
            <Input
              placeholder="john@email.com"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <FormLabel sx={{ mt: "20px" }}>Phone Number</FormLabel>
            <NumberInput>
              <NumberInputField
                placeholder="+1 789 456 000"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </NumberInput>
            <FormLabel sx={{ mt: "20px" }}>Street Address</FormLabel>
            <Input
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <div>
                <FormLabel>City</FormLabel>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <FormLabel>Postal Code</FormLabel>
                <Input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <FormLabel>Country</FormLabel>
                <Input
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <FormLabel mt="20px">Invoice Date</FormLabel>
            <Input
              type="date"
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleInputChange}
            />
            <FormLabel mt="20px">Description</FormLabel>
            <Input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <Text mt="30px" fontSize="large" color="grey">
              Item List
            </Text>
            {lineItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                  gap: "10px",
                }}
              >
                <div>
                  <FormLabel>Item Name</FormLabel>
                  <Input
                    w="auto"
                    name="itemName"
                    value={item.itemName}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>
                <div>
                  <FormLabel>Qty.</FormLabel>
                  <NumberInput
                    w="80px"
                    name="quantity"
                    value={item.quantity}
                    onChange={(valueNumber) =>
                      handleItemChange(index, {
                        target: {
                          name: "quantity",
                          value: valueNumber,
                        },
                      })
                    }
                  >
                    <NumberInputField />
                  </NumberInput>
                </div>
                <div>
                  <FormLabel>Rate</FormLabel>
                  <NumberInput
                    w="120px"
                    name="rate"
                    value={item.rate}
                    onChange={(valueNumber) =>
                      handleItemChange(index, {
                        target: {
                          name: "rate",
                          value: valueNumber,
                        },
                      })
                    }
                  >
                    <NumberInputField />
                  </NumberInput>
                </div>
                <div>
                  <FormLabel>Amount</FormLabel>
                  <Text
                    w="auto"
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {item.amount}
                  </Text>
                </div>
                <CloseButton
                  onClick={() => handleDeleteField(index)}
                  aria-label="close-button"
                  mt="35px"
                />
              </div>
            ))}
            <Button onClick={handleAddLineItem} mt="20px" color="blue">
              <FaPlus />{" "}
              <span style={{ paddingLeft: "5px" }}>Add Line Item</span>
            </Button>
            <div style={{ marginTop: "30px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text as="b">Sub Total</Text>
                <Text as="b" display="flex" flexDirection="row">
                  {subtotal}
                </Text>
              </div>
              {extraFields.map((field, index) => (
                <div
                  key={field.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                    gap: "50px",
                  }}
                >
                  <Input type="text" defaultValue={field.type} />
                  <InputGroup>
                    <NumberInput defaultValue={0}>
                      <NumberInputField
                        onChange={(valueNumber) =>
                          handleExtraFieldChange(
                            index,
                            "amount",
                            parseFloat(valueNumber.target.value)
                          )
                        }
                      />
                    </NumberInput>
                    {/* {field.type !== "Shipping" &&
                      field.type !== "Discount" &&
                      field.type !== "Tax" && (
                        <InputRightAddon>
                          <IconButton
                            onClick={() =>
                              handleExtraFieldChange(
                                index,
                                "isPercentageMode",
                                !field.isPercentageMode
                              )
                            }
                          >
                            {!field.isPercentageMode ? (
                              <RepeatIcon />
                            ) : (
                              <AiOutlinePercentage />
                            )}
                          </IconButton>
                        </InputRightAddon>
                      )} */}
                  </InputGroup>
                  <CloseButton onClick={() => handleDeleteField(index)} />
                </div>
              ))}
              <div style={{ marginTop: "10px" }}>
                {!extraFields.some((field) => field.type === "Tax") && (
                  <Button
                    onClick={(e) => handleAddExtraField("Tax", 0)}
                    variant="outlined"
                    color="green"
                    gap="5px"
                  >
                    <span>
                      <FaPlus color="green" />
                    </span>
                    Tax
                  </Button>
                )}
                {!extraFields.some((field) => field.type === "Discount") && (
                  <Button
                    onClick={(e) => handleAddExtraField("Discount", 0)}
                    variant="outlined"
                    color="green"
                    gap="5px"
                  >
                    <span>
                      <FaPlus color="green" />
                    </span>
                    Discount
                  </Button>
                )}
                {!extraFields.some((field) => field.type === "Shipping") && (
                  <Button
                    onClick={(e) => handleAddExtraField("Shipping", 0)}
                    variant="outlined"
                    color="green"
                    gap="5px"
                  >
                    <span>
                      <FaPlus color="green" />
                    </span>
                    Shipping Charges
                  </Button>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Text as="b">Total</Text>
                <Text as="b" gap="20px" display="flex" flexDirection="row">
                  <span>
                    <Select
                      placeholder="$"
                      defaultValue={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                    >
                      {/* <option value="$">$</option> */}
                      {/* <option value="$">$</option> */}
                      <option value="£">£</option>
                      <option value="€">€</option>
                      <option value="₹">₹</option>
                    </Select>
                  </span>
                  <span style={{ marginTop: "8px" }}>{calculateTotal()}</span>
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <Text>Amount Paid</Text>
                <NumberInput defaultValue={amountPaid}>
                  <NumberInputField
                    onChange={(valueNumber) => {
                      const newAmountPaid = parseFloat(
                        valueNumber.target.value
                      );
                      setAmountPaid(newAmountPaid);
                      setBalanceDue(calculateTotal() - newAmountPaid);
                    }}
                  />
                </NumberInput>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <Text>Balance Due</Text>
                <Text>{balanceDue}</Text>
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <FormLabel>Notes</FormLabel>
              <Textarea defaultValue="It was great doing business with you." />
            </div>
            <div style={{ marginTop: "20px" }}>
              <FormLabel>Terms and Conditions</FormLabel>
              <Textarea defaultValue="Please make the payment by the due date." />
            </div>
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="submit" colorScheme="blue">
            {selectedInvoice ? "Update" : "Create"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

InvoiceDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InvoiceDrawer;
