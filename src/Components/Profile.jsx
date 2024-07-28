import React, { useState } from 'react';
import { 
  Box, 
  Image, 
  Drawer, 
  DrawerOverlay, 
  DrawerContent, 
  DrawerHeader, 
  DrawerBody, 
  Input, 
  Button, 
  Avatar, 
  Text 
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../redux/ProfileSlice';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    dispatch(updateProfile({
      firstName: profile.firstName,
      lastName: profile.lastName,
      businessName: profile.businessName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      address: profile.address,
      gstRegisteredNumber: profile.gstRegisteredNumber,
      pan: profile.pan,
    }));
    handleClose();
  };

  const handleInputChange = (e) => {
    dispatch(updateProfile({ [e.target.name]: e.target.value }));
  };

  return (
    <Box position="fixed" top="20px" right="20px" zIndex={10}>
      <Box
        bg="white"
        borderRadius="50px"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
        padding="10px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
        onClick={handleOpen}
      >
        <Avatar name={profile.name} src={profile.businessName || ''} size='sm' />
        <Text marginLeft='10px' fontSize='16px'>{`Hello, ${profile.businessName || 'User!'}`}</Text>
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={handleClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Edit Profile</DrawerHeader>
          <DrawerBody display="flex" flexDirection="column" gap="10px">
            <Input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            <Input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
            <Input
              type="text"
              name="businessName"
              value={profile.businessName}
              onChange={handleInputChange}
              placeholder="Business Name"
            />
            <Input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <Input
              type="tel"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
            />
            <Input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
            <Input
              type="text"
              name="gstRegisteredNumber"
              value={profile.gstRegisteredNumber}
              onChange={handleInputChange}
              placeholder="GST Registered Number"
            />
            <Input
              type="text"
              name="pan"
              value={profile.pan}
              onChange={handleInputChange}
              placeholder="PAN"
            />
            <Button onClick={handleSave}>Save</Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Profile;