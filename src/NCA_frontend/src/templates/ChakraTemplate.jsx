import { ChakraProvider } from "@chakra-ui/react";

export default function ChakraTemplate({ children }) {
  return (
    <ChakraProvider>
      <div>{children}</div>
    </ChakraProvider>
  );
}
