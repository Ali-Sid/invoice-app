import { extendTheme } from "@chakra-ui/react";


const CustomTheme = extendTheme({
    components: {
      DatePicker: {
        parts: ["calendar"],
        variants: {
          light: {
            calendar: {
              bg: "white",
              color: "black",
            },
          },
        },
      },
    },
   });

export default CustomTheme