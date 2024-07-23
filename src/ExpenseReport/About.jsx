import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

function About() {
  const [imageUrl, setImageUrl] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const [showCloseButton, setShowCloseButton] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        setShowInput(false); // Hide the input field after upload
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageUrl(null);
    setShowInput(true); // Show the input field again
  };

  return (
    <div>
      <FormControl>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "0 0 0 100px",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {imageUrl && (
              <Box
                position="relative"
                onMouseEnter={() => setShowCloseButton(true)}
                onMouseLeave={() => setShowCloseButton(false)}
              >
                <Image
                  src={imageUrl}
                  alt="Uploaded"
                  fill
                  width="250px"
                  style={{ objectFit: "cover" }}
                />
                {showCloseButton && (
                  <IconButton
                    aria-label="Remove image"
                    icon={<CloseIcon />}
                    size="sm"
                    position="absolute"
                    top="0"
                    right="0"
                    onClick={removeImage}
                  />
                )}
              </Box>
            )}
            {showInput && <Input type="file" onChange={handleImageUpload} />}
            <Stack spacing={1} direction="column">
              <Input
                type="text"
                size="lg"
                fontWeight="bold"
                color="#3c4142"
                border="none"
                placeholder="Your Company Name"
              />
              <Input
                type="text"
                size="sm"
                color="#3c4142"
                border="none"
                placeholder="Company Address"
                paddingLeft="15px"
              />
              <Input
                type="text"
                size="sm"
                color="#3c4142"
                border="none"
                placeholder="City, State, Zip"
                paddingLeft="15px"
              />
              <Input
                type="text"
                size="sm"
                color="#3c4142"
                border="none"
                placeholder="Country"
                paddingLeft="15px"
              />
            </Stack>
          </div>
        </div>
      </FormControl>
    </div>
  );
}

export default About;
