import { Container, Box } from "@chakra-ui/react";
import Nav from "./nav";

function Layout({ children }) {
  return (
    <Container pt="10" maxW="container.lg">
      <Nav />
      <Box pt={5}>{children}</Box>
    </Container>
  );
}

export default Layout;
